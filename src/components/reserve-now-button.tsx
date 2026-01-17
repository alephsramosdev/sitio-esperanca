import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";

import Button from "@/components/button";
import { buildReservationHref } from "@/utils/reservations";

type ReserveNowButtonProps = {
    bgColor?: string;
    color?: string;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
    checkIn?: string;
    checkOut?: string;
};

export default function ReserveNowButton({
    bgColor,
    color,
    className,
    style,
    children = "Reservar agora",
    checkIn,
    checkOut,
}: ReserveNowButtonProps) {
    const router = useRouter();

    const link = useMemo(() => {
        // Recompute when route changes so the latest persisted UTM is applied.
        return buildReservationHref({ checkIn, checkOut });
    }, [router.asPath, checkIn, checkOut]);

    return (
        <Button
            href={link.href}
            target={link.target}
            rel={link.rel}
            bgColor={bgColor}
            color={color}
            className={className}
            style={style}
        >
            {children}
        </Button>
    );
}
