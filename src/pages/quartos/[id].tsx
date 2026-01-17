import type { GetStaticPaths, GetStaticProps } from "next";
import Seo from "@/components/seo";
import styled from "@emotion/styled";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Text from "@/components/text";
import Button from "@/components/button";
import ReserveNowButton from "@/components/reserve-now-button";
import SuiteCard from "@/components/cards/suite";
import type { Suite } from "@/db/suites";
import { suites } from "@/db/suites";

import seta from "@/assets/icons/seta-para-direita.svg";

import Piscina from "@/assets/moments/piscina-enorme-sitio-esperanca.jpg";
import PetFriendly from "@/assets/moments/pet-friendly-sitio-esperanca.jpg";
import QuintalVerde from "@/assets/moments/quintal-verde-sitio-esperanca.jpg";
import Sala from "@/assets/moments/sala-de-estar-sitio-esperanca.jpg";
import CampoFutebol from "@/assets/moments/campo-de-futebol-sitio-esperanca.jpg";
import PingPong from "@/assets/moments/ping-pong-sitio-esperanca.jpg";
import Sinuca from "@/assets/moments/sinuca-sitio-esperanca.jpg";
import Toto from "@/assets/moments/toto-sitio-esperanca.jpg";
import Jogos from "@/assets/moments/jogos-sitio-esperanca.jpg";
import EspacoCrianca from "@/assets/moments/espaco-para-crianca-sitio-esperanca.jpg";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

type EnjoyItem = {
    image: StaticImageData;
    alt: string;
    title: string;
    copy: string;
};

type SuitePageProps = {
    suiteId: string;
};

const Page = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: 148px 48px 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 28px;

    @media (max-width: 768px) {
        padding: 124px 5% 5% 5%;
        gap: 20px;
    }
`;

const TitleBlock = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;

    @media (max-width: 900px) {
        flex-direction: column;
    }

    & .title {
        font-size: 56px;
        line-height: 1;
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        letter-spacing: -1px;

        @media (max-width: 768px) {
            font-size: 34px;
        }
    }

    & .desc {
        margin-top: 10px;
        font-size: 18px;
        line-height: 1.3;
        color: ${(props) => props.theme.colors.text.secondary};
        max-width: 66ch;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

const ContentGrid = styled.section`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 28px;
    align-items: start;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Gallery = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    & .main {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        background: ${(props) => props.theme.colors.neutral.gray[200]};
        position: relative;
        aspect-ratio: 16 / 10;
        height: clamp(320px, 42vw, 560px);
        max-height: 560px;

        @media (max-width: 900px) {
            height: auto;
            max-height: none;
        }
    }

    & .thumbs {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 8px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    & .thumb {
        appearance: none;
        border: none;
        padding: 0;
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[300]};
        border-radius: 6px;
        overflow: hidden;
        background: ${(props) => props.theme.colors.neutral.gray[200]};
        cursor: pointer;
        transition: border-color 200ms ease, transform 200ms ease;
        position: relative;
        aspect-ratio: 4 / 3;
    }

    & .thumb:hover {
        transform: translateY(-1px);
        border-color: ${(props) => props.theme.colors.neutral.gray[400]};
    }

    & .thumb[data-active="true"] {
        border-color: ${(props) => props.theme.colors.primary.base};
    }
`;

const SideCard = styled.aside`
    border: 1px solid ${(props) => props.theme.colors.neutral.gray[300]};
    border-radius: 14px;
    padding: 18px;
    background: ${(props) => props.theme.colors.neutral.white.base};
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: sticky;
    top: 110px;

    @media (max-width: 900px) {
        position: static;
        top: auto;
    }

    @media (max-width: 520px) {
        display: grid;
        gap: 24px;
        align-items: start;
    }

    & .price {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        gap: 14px;

        @media (max-width: 520px) {
            align-items: center;
            width: 100%;
        }

        & .value {
            font-size: 30px;
            font-weight: ${(props) => props.theme.fonts.weights.medium};
            color: ${(props) => props.theme.colors.neutral.black.primary};
            letter-spacing: -0.5px;
        }

        & .note {
            font-size: 13px;
            color: ${(props) => props.theme.colors.text.disabled};
        }
    }

    & .facts {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;

        @media (max-width: 520px) {
            grid-column: 1 / -1;
        }
    }

    & .fact {
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
        background: ${(props) => props.theme.colors.neutral.white.light};
        border-radius: 12px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        & .k {
            font-size: 12px;
            color: ${(props) => props.theme.colors.text.disabled};
        }

        & .v {
            font-size: 14px;
            color: ${(props) => props.theme.colors.neutral.black.primary};
            font-weight: ${(props) => props.theme.fonts.weights.medium};
        }
    }

    & .cta {
        width: 100%;
        display: flex;
        gap: 12px;

        @media (max-width: 520px) {
            grid-column: 1 / -1;
        }

        & > * {
            width: 100%;
        }

        & button {
            width: 100%;
        }
    }

    & .helper {
        font-size: 13px;
        line-height: 1.2;
        color: ${(props) => props.theme.colors.text.secondary};

        & a {
            color: ${(props) => props.theme.colors.neutral.black.primary};
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 3px;
        }

        @media (max-width: 520px) {
            grid-column: 1 / -1;
        }
    }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .h2 {
        font-size: 28px;
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        letter-spacing: -0.5px;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }
`;

const AmenitiesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 520px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 520px) {
        &[data-collapsed="true"] > *:nth-of-type(n + 5) {
            display: none;
        }
    }
`;

const AmenityRow = styled.div`
    border: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
    background: ${(props) => props.theme.colors.neutral.white.light};
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;

    & .icon {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: ${(props) => props.theme.colors.neutral.white.base};
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.colors.neutral.black.primary};
        flex: none;
    }

    & .label {
        font-size: 14px;
        color: ${(props) => props.theme.colors.neutral.black.primary};
        line-height: 1.2;
    }

    &[data-muted="true"] {
        opacity: 0.55;
        filter: grayscale(1);
    }
`;

const MobileToggle = styled.button`
    border: none;
    background: transparent;
    padding: 0;
    width: fit-content;
    color: ${(props) => props.theme.colors.neutral.black.primary};
    font-family: ${(props) => props.theme.fonts.primary};
    font-weight: ${(props) => props.theme.fonts.weights.medium};
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;

    @media (min-width: 521px) {
        display: none;
    }
`;

const DateGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media (max-width: 520px) {
        grid-column: 1 / -1;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

const DateField = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;

    & .label {
        font-size: 12px;
        color: ${(props) => props.theme.colors.text.disabled};
    }

    & input {
        height: 44px;
        border-radius: 10px;
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[300]};
        background: ${(props) => props.theme.colors.neutral.white.base};
        padding: 0 10px;
        font-family: ${(props) => props.theme.fonts.primary};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        outline: none;
    }

    & input:focus {
        border-color: ${(props) => props.theme.colors.primary.base};
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    }
`;

const EnjoySection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 24px 0;

    & .title {
        font-size: 42px;
        line-height: 1.1;
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        letter-spacing: -0.5px;
        font-weight: 400;

        @media (max-width: 768px) {
            font-size: 26px;
        }
    }

    & .subtitle {
        font-size: 18px;
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.2;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

    & .grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 10px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (max-width: 768px) {
            grid-auto-flow: column;
            grid-auto-columns: minmax(150px, 1fr);
            grid-template-columns: none;
            overflow-x: auto;
            padding-bottom: 6px;
            scroll-snap-type: x mandatory;
        }
    }
`;

const EnjoyCard = styled.button`
    appearance: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
    background: ${(props) => props.theme.colors.neutral.white.base};
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
    scroll-snap-align: start;
    transition: transform 160ms ease, border-color 160ms ease;

    &:hover {
        transform: translateY(-2px);
        border-color: ${(props) => props.theme.colors.neutral.gray[300]};
    }

    & .img {
        width: 100%;
        position: relative;
        aspect-ratio: 4 / 3;
        background: ${(props) => props.theme.colors.neutral.gray[200]};
    }

    & .label {
        padding: 0 10px 10px;
        font-size: 14px;
        color: ${(props) => props.theme.colors.neutral.black.primary};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        line-height: 1.1;
    }

    & .copy {
        padding: 0 10px 12px;
        margin-top: -6px;
        font-size: 12px;
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.2;
    }
`;

const StickyBar = styled.div<{ $show: boolean }>`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
    transform: translateY(${(props) => (props.$show ? "0" : "14px")});
    opacity: ${(props) => (props.$show ? 1 : 0)};
    pointer-events: ${(props) => (props.$show ? "auto" : "none")};
    transition: opacity 200ms ease, transform 200ms ease;

    @media (min-width: 901px) {
        padding: 14px 24px;
    }
`;

const StickyBarInner = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    & .lead {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
    }

    & .thumb {
        appearance: none;
        border: none;
        padding: 0;
        width: 52px;
        height: 52px;
        border-radius: 12px;
        overflow: hidden;
        background: ${(props) => props.theme.colors.neutral.gray[200]};
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[200]};
        flex: none;
        position: relative;
        cursor: pointer;
    }

    & .info {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
    }

    & .name {
        font-size: 14px;
        color: ${(props) => props.theme.colors.neutral.black.primary};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        line-height: 1.1;
    }

    & .meta {
        font-size: 12px;
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.2;
    }

    & .price {
        font-size: 16px;
        color: ${(props) => props.theme.colors.neutral.black.primary};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        line-height: 1.1;
        text-align: right;

        @media (max-width: 768px) {
            text-align: left;
        }
    }

    & .cta {
        display: flex;
        justify-content: flex-end;
        flex: none;

        @media (max-width: 768px) {
            justify-content: stretch;
        }

        & button {
            width: 220px;

            @media (max-width: 768px) {
                width: 100%;
            }
        }
    }
`;

const OtherSuites = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;

    & .title {
        font-size: 42px;
        line-height: 1.1;
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        letter-spacing: -0.5px;
        font-weight: 400;

        @media (max-width: 768px) {
            font-size: 26px;
        }
    }

    & .carousel {
        width: 100%;
        position: relative;
    }

    & .controls {
        width: 110%;
        left: -5%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media (min-width: 768px) {
            display: none;
        }

        & > button {
            background: #fff;
            border-radius: 99px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            border: 1px solid rgba(0, 0, 0, 0.08);

            &:nth-child(1) {
                transform: rotate(180deg);
            }
        }
    }
`;


const WhatsAppButton = styled.a`
    border: none;
    font-size: 18px;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-family: ${(props) => props.theme.fonts.primary};
    letter-spacing: -1px;
    font-weight: ${(props) => props.theme.fonts.weights.medium};
    background: ${(props) => props.theme.colors.neutral.white.base};
    color: ${(props) => props.theme.colors.neutral.black.primary};
    border: 1px solid ${(props) => props.theme.colors.neutral.gray[300]};
    text-decoration: none;
    transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        border-color: ${(props) => props.theme.colors.neutral.gray[400]};
    }

    &:active {
        transform: scale(1);
    }
`;

function formatCurrencyBRL(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function parseDateInput(value: string): Date | null {
    if (!value) return null;
    const parts = value.split("-").map((p) => Number(p));
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    if (!year || !month || !day) return null;
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) return null;
    return date;
}

function addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function isWeekendRateDay(date: Date): boolean {
    // Regra simples: sexta (5), sábado (6) e domingo (0)
    const d = date.getDay();
    return d === 5 || d === 6 || d === 0;
}

export default function SuiteDetailsPage({ suiteId }: SuitePageProps) {
    const suite = useMemo(() => suites.find((s) => s.id === suiteId), [suiteId]);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const [showAllNoAmenities, setShowAllNoAmenities] = useState(false);
    const [checkIn, setCheckIn] = useState<string>("");
    const [checkOut, setCheckOut] = useState<string>("");
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const otherSwiperRef = useRef<SwiperClass | null>(null);
    const sideCardRef = useRef<HTMLElement | null>(null);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    if (!suite) {
        return (
            <Page>
                <Text as="h1" className="title">
                    Suíte não encontrada
                </Text>
                <Link href="/quartos" style={{ textDecoration: "none" }}>
                    <Text as="span" style={{ color: "inherit", fontSize: 14 }}>
                        Voltar para acomodações
                    </Text>
                </Link>
            </Page>
        );
    }

    const [activeImage, setActiveImage] = useState(0);
    const [lightboxSlides, setLightboxSlides] = useState<Array<{ src: string }>>([]);

    const images = suite.images?.length ? suite.images : ["/placeholder.jpg"];
    const mainImage = images[Math.min(activeImage, images.length - 1)];
    const imagesCount = images.length;

    const openLightbox = (idx: number) => {
        setLightboxSlides(images.map((src) => ({ src })));
        setLightboxIndex(Math.max(0, Math.min(idx, imagesCount - 1)));
        setIsLightboxOpen(true);
    };

    const title = suite.name;
    const description = suite.shortDescription;
    const suiteImage = `/api/og/suite?id=${suite.id}`;

    const facts = useMemo(
        () => [
            { k: "Hóspedes", v: `Até ${suite.persons}` },
            { k: "Quartos", v: `${suite.rooms}` },
            { k: "Banheiros", v: `${suite.bathroom}` },
            { k: "Camas", v: `${suite.bed}` },
        ],
        [suite]
    );

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 901px)");
        const update = () => setIsDesktop(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const onScroll = () => setHasScrolled(window.scrollY > 220);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const el = sideCardRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (isDesktop) return;
                setShowStickyBar(hasScrolled && !entry.isIntersecting);
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [isDesktop, hasScrolled]);

    useEffect(() => {
        if (!isDesktop) return;
        setShowStickyBar(hasScrolled);
    }, [isDesktop, hasScrolled]);

    const openEnjoyLightbox = (idx: number, slides: Array<{ src: string }>) => {
        setLightboxSlides(slides);
        setLightboxIndex(Math.max(0, Math.min(idx, slides.length - 1)));
        setIsLightboxOpen(true);
    };

    const whatsAppNumber = 5532999189934;
    const whatsAppUrl = useMemo(() => {
        if (!whatsAppNumber) return undefined;
        const text = `Olá! Gostaria de reservar: ${suite.name}. Hóspedes: até ${suite.persons}. Check-in: ${checkIn || "__"} | Check-out: ${checkOut || "__"}`;
        return `https://wa.me/${encodeURIComponent(whatsAppNumber)}?text=${encodeURIComponent(text)}`;
    }, [whatsAppNumber, suite.name, suite.persons, checkIn, checkOut]);

    const otherSuites = useMemo(() => suites.filter((s) => s.id !== suite.id), [suite.id]);

    const { installmentPrice } = useMemo(() => {
        const pricing = suite.pricing;

        const getNightRate = (date: Date): number => {
            if (!pricing) return suite.price;
            return isWeekendRateDay(date) ? pricing.weekend : pricing.weekday;
        };

        const checkInDate = parseDateInput(checkIn);
        const checkOutDate = parseDateInput(checkOut);

        let total = 0;

        if (checkInDate && checkOutDate && checkOutDate.getTime() > checkInDate.getTime()) {
            let cursor = checkInDate;
            while (cursor.getTime() < checkOutDate.getTime()) {
                total += getNightRate(cursor);
                cursor = addDays(cursor, 1);
            }
        } else {
            total = getNightRate(new Date());
        }

        return {
            installmentPrice: total / 6,
        };
    }, [suite.price, suite.pricing, checkIn, checkOut]);

    const enjoyItems = useMemo(
        () => [
            { image: Piscina, alt: "Piscina enorme do Sítio Esperança", title: "Piscina para relaxar", copy: "Ideal para curtir o dia inteiro" },
            { image: PetFriendly, alt: "Ambiente pet friendly", title: "Pet friendly", copy: "Traga seu companheiro" },
            { image: QuintalVerde, alt: "Quintal verde", title: "Muito verde", copy: "Natureza e tranquilidade" },
            { image: Sala, alt: "Sala de estar", title: "Sala aconchegante", copy: "Conforto para descansar" },
            { image: CampoFutebol, alt: "Campo de futebol", title: "Campo de futebol", copy: "Diversão garantida" },
            { image: PingPong, alt: "Mesa de ping pong", title: "Ping pong", copy: "Partidas rápidas" },
            { image: Sinuca, alt: "Mesa de sinuca", title: "Sinuca", copy: "Clássico da resenha" },
            { image: Toto, alt: "Mesa de totó", title: "Totó", copy: "Pra jogar em dupla" },
            { image: Jogos, alt: "Mesa de jogos", title: "Jogos", copy: "Para todas as idades" },
            { image: EspacoCrianca, alt: "Espaço para criança", title: "Espaço kids", copy: "Criançada se diverte" },
        ],
        []
    );

    const enjoySlides = useMemo(() => enjoyItems.map((i) => ({ src: i.image.src })), [enjoyItems]);

    return (
        <>
            <Seo
                title={`${title} | Sítio Esperança`}
                description={description}
                path={`/quartos/${suite.id}`}
                image={suiteImage}
                additionalImages={["/logo-black.png", "/favicon.png"]}
                type="article"
            />

            <Page>
                <TitleBlock>
                    <div>
                        <Text as="h1" className="title">
                            {suite.name}
                        </Text>
                        <Text as="p" className="desc">
                            {suite.shortDescription}
                        </Text>
                    </div>
                </TitleBlock>

                <ContentGrid>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <Gallery>
                            <div className="main">
                                <Image
                                    src={mainImage}
                                    alt={suite.name}
                                    priority
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 900px) 100vw, 60vw"
                                />

                                <button
                                    type="button"
                                    onClick={() => openLightbox(activeImage)}
                                    aria-label="Abrir galeria expandida"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "transparent",
                                        border: "none",
                                        cursor: "zoom-in",
                                    }}
                                />
                            </div>

                            <div className="thumbs" aria-label="Galeria da suíte">
                                {images.map((img, idx) => (
                                    <button
                                        key={`${img}-${idx}`}
                                        type="button"
                                        className="thumb"
                                        data-active={idx === activeImage}
                                        onClick={() => {
                                            setActiveImage(idx);
                                            openLightbox(idx);
                                        }}
                                        aria-label={`Ver foto ${idx + 1}`}
                                    >
                                        <Image
                                            src={img}
                                            alt=""
                                            aria-hidden
                                            fill
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 768px) 22vw, 8vw"
                                        />
                                    </button>
                                ))}
                            </div>
                        </Gallery>

                        <Section>
                            <Text as="h2" className="h2">
                                O que esse espaço oferece
                            </Text>
                            <AmenitiesGrid data-collapsed={!showAllAmenities}>
                                {suite.amenities.map((a) => {
                                    const Icon = a.icon;
                                    return (
                                        <AmenityRow key={a.id}>
                                            <span className="icon" aria-hidden>
                                                <Icon size={18} />
                                            </span>
                                            <Text as="span" className="label">
                                                {a.label}
                                            </Text>
                                        </AmenityRow>
                                    );
                                })}
                            </AmenitiesGrid>

                            <MobileToggle type="button" onClick={() => setShowAllAmenities((v) => !v)}>
                                {showAllAmenities ? "Ver menos" : "Ver todas"}
                            </MobileToggle>
                        </Section>

                        <Section>
                            <Text as="h2" className="h2">
                                Não inclui
                            </Text>
                            <AmenitiesGrid data-collapsed={!showAllNoAmenities}>
                                {suite.noAmenities.map((a) => {
                                    const Icon = a.icon;
                                    return (
                                        <AmenityRow key={a.id} data-muted="true">
                                            <span className="icon" aria-hidden>
                                                <Icon size={18} />
                                            </span>
                                            <Text as="span" className="label">
                                                {a.label}
                                            </Text>
                                        </AmenityRow>
                                    );
                                })}
                            </AmenitiesGrid>

                            <MobileToggle type="button" onClick={() => setShowAllNoAmenities((v) => !v)}>
                                {showAllNoAmenities ? "Ver menos" : "Ver todas"}
                            </MobileToggle>
                        </Section>
                    </div>

                    <SideCard ref={sideCardRef}>
                        <div className="price">
                            <Text as="span" className="value">
                                <span style={{ fontSize: 16, opacity: 0.75, fontWeight: 500 }}>
                                    A partir de: 6x de{" "}
                                </span>
                                <span style={{ fontSize: 22, fontWeight: 700 }}>
                                    {formatCurrencyBRL(installmentPrice)}
                                </span>
                            </Text>
                        </div>

                        <DateGrid>
                            <DateField>
                                <Text as="span" className="label">
                                    Check-in
                                </Text>
                                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                            </DateField>

                            <DateField>
                                <Text as="span" className="label">
                                    Check-out
                                </Text>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                            </DateField>
                        </DateGrid>

                        <div className="facts">
                            {facts.map((f) => (
                                <div key={f.k} className="fact">
                                    <Text as="span" className="k">
                                        {f.k}
                                    </Text>
                                    <Text as="span" className="v">
                                        {f.v}
                                    </Text>
                                </div>
                            ))}
                        </div>

                        <div className="cta">
                            <ReserveNowButton
                                bgColor="rgb(8, 71, 52)"
                                color="rgb(255, 255, 255)"
                                checkIn={checkIn}
                                checkOut={checkOut}
                            />

                            <WhatsAppButton
                                href={whatsAppUrl || "#"}
                                target={whatsAppUrl ? "_blank" : undefined}
                                rel={whatsAppUrl ? "noreferrer" : undefined}
                                aria-disabled={!whatsAppUrl}
                                style={!whatsAppUrl ? { opacity: 0.6, pointerEvents: "none" } : undefined}
                            >
                                WhatsApp
                            </WhatsAppButton>
                        </div>

                        <Text as="p" className="helper">
                            Ao continuar, você concorda com nossa {" "}
                            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
                            {" "} e com os {" "}
                            <Link href="/termos-e-condicoes">Termos e Condições</Link>.
                        </Text>
                    </SideCard>
                </ContentGrid>

                <EnjoySection>
                    <Text as="h2" className="title">
                        Se hospedando aqui você desfruta de:
                    </Text>
                    <div className="grid" aria-label="Vantagens da hospedagem">
                        {enjoyItems.map((item, idx) => (
                            <EnjoyCard
                                key={item.title}
                                type="button"
                                aria-label={`Ver fotos: ${item.title}`}
                                onClick={() => openEnjoyLightbox(idx, enjoySlides)}
                            >
                                <div className="img">
                                    <Image src={item.image} alt={item.alt} fill style={{ objectFit: "cover" }} />
                                </div>
                                <Text as="span" className="label">
                                    {item.title}
                                </Text>
                                <Text as="span" className="copy">
                                    {item.copy}
                                </Text>
                            </EnjoyCard>
                        ))}
                    </div>
                </EnjoySection>

                <OtherSuites>
                    <Text as="h2" className="title">
                        Ver outras suítes
                    </Text>

                    <div className="carousel">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={24}
                            onSwiper={(swiper) => {
                                otherSwiperRef.current = swiper;
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                            }}
                            style={{ width: "100%" }}
                        >
                            {otherSuites.map((s) => (
                                <SwiperSlide key={s.id}>
                                    <SuiteCard suite={s} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="controls">
                            <button type="button" onClick={() => otherSwiperRef.current?.slidePrev()} aria-label="Anterior">
                                <Image src={seta} alt="Seta para esquerda" />
                            </button>
                            <button type="button" onClick={() => otherSwiperRef.current?.slideNext()} aria-label="Próximo">
                                <Image src={seta} alt="Seta para direita" />
                            </button>
                        </div>
                    </div>
                </OtherSuites>

                <Lightbox
                    open={isLightboxOpen}
                    close={() => setIsLightboxOpen(false)}
                    index={lightboxIndex}
                    slides={lightboxSlides}
                    plugins={[Zoom, Thumbnails]}
                    carousel={{ finite: false }}
                />

                <StickyBar $show={showStickyBar}>
                    <StickyBarInner>
                        <div className="lead">
                            <button
                                type="button"
                                className="thumb"
                                onClick={() => openLightbox(activeImage)}
                                aria-label="Abrir galeria de fotos"
                            >
                                <Image src={mainImage} alt="" aria-hidden fill style={{ objectFit: "cover" }} />
                            </button>
                            <div className="info">
                                <Text as="div" className="name">
                                    {suite.name}
                                </Text>
                                <Text as="div" className="meta">
                                    {checkIn && checkOut
                                        ? `Datas: ${checkIn} → ${checkOut}`
                                        : "Selecione as datas para consultar disponibilidade"}
                                </Text>
                            </div>
                        </div>

                        <Text as="div" className="price">
                            <span style={{ fontSize: 12, opacity: 0.75, fontWeight: 500 }}>
                                A partir de: 6x de{" "}
                            </span>
                            <span style={{ fontWeight: 700 }}>
                                {formatCurrencyBRL(installmentPrice)}
                            </span>
                        </Text>

                        <div className="cta">
                            <ReserveNowButton
                                bgColor="rgb(8, 71, 52)"
                                color="rgb(255, 255, 255)"
                                checkIn={checkIn}
                                checkOut={checkOut}
                            />
                        </div>
                    </StickyBarInner>
                </StickyBar>
            </Page>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: suites.map((suite) => ({ params: { id: suite.id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<SuitePageProps> = async (ctx) => {
    const id = ctx.params?.id;
    const suiteId = Array.isArray(id) ? id[0] : id;

    const suite = suites.find((s) => s.id === suiteId);

    if (!suite) {
        return { notFound: true };
    }

    return {
        props: {
            suiteId: suite.id,
        },
    };
};
