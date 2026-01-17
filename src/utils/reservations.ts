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
		params.checkin = ctx.checkIn;
		params.checkout = ctx.checkOut;
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

