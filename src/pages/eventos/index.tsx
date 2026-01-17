import type { GetServerSideProps } from "next";
import { buildReservationHref } from "@/utils/reservations";

export const getServerSideProps: GetServerSideProps = async () => {
    const link = buildReservationHref();

    return {
        redirect: {
            destination: link.href,
            permanent: false,
        },
    };
};

export default function Eventos() {
    return null;
}