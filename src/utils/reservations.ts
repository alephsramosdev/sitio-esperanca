import { appendQueryParams, loadPersistedUtm } from "@/utils/utm";

export type ReservationLink = {
    href: string;
    target?: string;
    rel?: string;
};

export type ReservationContext = {
    checkIn?: string;
    checkOut?: string;
};

const DEFAULT_SECUREBOOKINGS_URL = "https://book.securebookings.net/roomrate";
const DEFAULT_SECUREBOOKINGS_LANG = "br";
const DEFAULT_SECUREBOOKINGS_CURRENCY = "BRL";
const DEFAULT_SECUREBOOKINGS_WIDGET_ID = "e752c3ef-2395-1767991286-4dc3-b53a-b5217056cd67";

function buildSecureBookingsRoomrateUrl(ctx?: ReservationContext): string {
    const baseUrl = process.env.NEXT_PUBLIC_SECUREBOOKINGS_URL || DEFAULT_SECUREBOOKINGS_URL;
    const widgetId = process.env.NEXT_PUBLIC_SECUREBOOKINGS_WIDGET_ID || DEFAULT_SECUREBOOKINGS_WIDGET_ID;
    const lang = process.env.NEXT_PUBLIC_SECUREBOOKINGS_LANG || DEFAULT_SECUREBOOKINGS_LANG;
    const currency = process.env.NEXT_PUBLIC_SECUREBOOKINGS_CURRENCY || DEFAULT_SECUREBOOKINGS_CURRENCY;

    const params: Record<string, string | undefined> = {
        id: widgetId,
        lang,
        currency,
    };

    if (ctx?.checkIn && ctx?.checkOut) {
        // Avoid timezone-related date shifts by parsing YYYY-MM-DD manually.
        const [ciY, ciM, ciD] = ctx.checkIn.split("-").map((v) => Number(v));
        const [coY, coM, coD] = ctx.checkOut.split("-").map((v) => Number(v));

        const isValid =
            Number.isFinite(ciY) && Number.isFinite(ciM) && Number.isFinite(ciD) &&
            Number.isFinite(coY) && Number.isFinite(coM) && Number.isFinite(coD) &&
            ciY > 1900 && coY > 1900 &&
            ciM >= 1 && ciM <= 12 && coM >= 1 && coM <= 12 &&
            ciD >= 1 && ciD <= 31 && coD >= 1 && coD <= 31;

        if (isValid) {
            params.checkinDay = String(ciD).padStart(2, "0");
            params.checkinMonth = String(ciM).padStart(2, "0");
            params.checkinYear = String(ciY);
            params.checkoutDay = String(coD).padStart(2, "0");
            params.checkoutMonth = String(coM).padStart(2, "0");
            params.checkoutYear = String(coY);

            const checkInUtc = Date.UTC(ciY, ciM - 1, ciD);
            const checkOutUtc = Date.UTC(coY, coM - 1, coD);
            const nights = Math.round((checkOutUtc - checkInUtc) / 86400000);
            if (nights > 0) params.nights = String(nights);

            // Some SecureBookings pages/flows use these parameter names.
            params.check_in = ctx.checkIn;
            params.check_out = ctx.checkOut;
        }
    }

    const utm = loadPersistedUtm();
    return appendQueryParams(baseUrl, { ...params, ...utm });
}

export function buildReservationHref(ctx?: ReservationContext): ReservationLink {
    return {
        href: buildSecureBookingsRoomrateUrl(ctx),
        target: "_blank",
        rel: "noopener noreferrer",
    };
}

