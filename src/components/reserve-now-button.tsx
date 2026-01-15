import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";

import Button from "@/components/button";
import { buildHospedinReservationUrl } from "@/utils/hospedin";

type ReserveNowButtonProps = {
    bgColor?: string;
    color?: string;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
};

export default function ReserveNowButton({
    bgColor,
    color,
    className,
    style,
    children = "Reservar agora",
}: ReserveNowButtonProps) {
    const router = useRouter();

    const href = useMemo(() => {
        // Recompute when route changes so the latest persisted UTM is applied.
        return buildHospedinReservationUrl();
    }, [router.asPath]);

    return (
        <Button
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            bgColor={bgColor}
            color={color}
            className={className}
            style={style}
        >
            {children}
        </Button>
    );
}
