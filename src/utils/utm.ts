type PersistedUtmKey = "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content";

export type PersistedUtmParams = Partial<Record<PersistedUtmKey, string>>;

const UTM_KEYS: PersistedUtmKey[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
];

const STORAGE_KEY = "sitio_esperanca_utm_v1";

function safeParseJson(value: string | null): unknown {
    if (!value) return undefined;
    try {
        return JSON.parse(value);
    } catch {
        return undefined;
    }
}

export function readUtmFromSearch(search: string): PersistedUtmParams {
    const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
    const result: PersistedUtmParams = {};

    for (const key of UTM_KEYS) {
        const value = params.get(key);
        if (value) result[key] = value;
    }

    return result;
}

export function loadPersistedUtm(): PersistedUtmParams {
    if (typeof window === "undefined") return {};

    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = safeParseJson(raw);

    if (!parsed || typeof parsed !== "object") return {};

    const obj = parsed as Record<string, unknown>;
    const result: PersistedUtmParams = {};

    for (const key of UTM_KEYS) {
        const value = obj[key];
        if (typeof value === "string" && value.trim()) {
            result[key] = value;
        }
    }

    return result;
}

export function persistUtm(next: PersistedUtmParams): void {
    if (typeof window === "undefined") return;

    const current = loadPersistedUtm();
    const merged: PersistedUtmParams = { ...current, ...next };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export function captureAndPersistUtmFromLocation(): void {
    if (typeof window === "undefined") return;

    const found = readUtmFromSearch(window.location.search);
    if (Object.keys(found).length === 0) return;

    persistUtm(found);
}

export function appendQueryParams(url: string, params: Record<string, string | undefined>): string {
    const base = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");

    for (const [key, value] of Object.entries(params)) {
        if (!value) continue;
        base.searchParams.set(key, value);
    }

    return base.toString();
}
