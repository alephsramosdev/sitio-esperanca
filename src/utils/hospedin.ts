import { appendQueryParams, loadPersistedUtm } from "@/utils/utm";

const DEFAULT_HOSPEDIN_URL = "https://hospedin.com.br";

export function getHospedinReservationBaseUrl(): string {
    return process.env.NEXT_PUBLIC_HOSPEDIN_RESERVATION_URL || DEFAULT_HOSPEDIN_URL;
}

export function buildHospedinReservationUrl(extraParams?: Record<string, string | undefined>): string {
    const baseUrl = getHospedinReservationBaseUrl();
    const utm = loadPersistedUtm();

    return appendQueryParams(baseUrl, {
        ...utm,
        ...extraParams,
        utm_persist: "1",
    });
}
