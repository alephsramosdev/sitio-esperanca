import Head from "next/head";
import { Fragment } from "react";

const DEFAULT_SITE_URL = "https://sitioesperancamp.com.br";

function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

function toAbsoluteUrl(pathOrUrl: string): string {
    try {
        return new URL(pathOrUrl).toString();
    } catch {
        return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, getSiteUrl()).toString();
    }
}

function getImageMimeType(url: string): string | undefined {
    try {
        const parsed = new URL(url);
        if (parsed.pathname.startsWith("/api/og/")) return "image/jpeg";
    } catch {
        if (url.startsWith("/api/og/")) return "image/jpeg";
    }

    const lower = url.toLowerCase();
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
    if (lower.endsWith(".webp")) return "image/webp";
    if (lower.endsWith(".avif")) return "image/avif";
    return undefined;
}

type SeoProps = {
    title: string;
    description: string;
    /** Path starting with '/', e.g. '/quartos/suite-1' */
    path: string;
    /** Relative (starting with '/') or absolute URL */
    image?: string;
    additionalImages?: string[];
    imageAlt?: string;
    type?: "website" | "article";
};

export default function Seo({ title, description, path, image, additionalImages, imageAlt, type = "website" }: SeoProps) {
    const canonicalUrl = toAbsoluteUrl(path);
    const primaryImageUrl = toAbsoluteUrl(image || "/api/og/default");
    const allImages = [primaryImageUrl, ...(additionalImages || []).map(toAbsoluteUrl)].filter(
        (value, index, self) => self.indexOf(value) === index
    );
    const resolvedImageAlt = imageAlt || title;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index,follow,max-image-preview:large" />

            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:site_name" content="Sítio Esperança" />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {allImages.map((img) => {
                const imgType = getImageMimeType(img);
                return (
                    <Fragment key={img}>
                        <meta property="og:image" content={img} />
                        <meta property="og:image:secure_url" content={img} />
                        <meta property="og:image:alt" content={resolvedImageAlt} />
                        {img === primaryImageUrl ? (
                            <>
                                <meta property="og:image:width" content="1200" />
                                <meta property="og:image:height" content="630" />
                            </>
                        ) : null}
                        {imgType ? <meta property="og:image:type" content={imgType} /> : null}
                    </Fragment>
                );
            })}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={primaryImageUrl} />
            <meta name="twitter:image:alt" content={resolvedImageAlt} />
        </Head>
    );
}
