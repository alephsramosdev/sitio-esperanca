import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LogoImage from "@/assets/logotipo/logo.svg";
import LogoBlack from "../../../public/logo-black.svg";
import Text from "../text";
import Button from "../button";
import Sidebar from "./sidebar";

type HeaderBaseProps = {
    $solid?: boolean;
};

const HeaderBase = styled.header<HeaderBaseProps>`
    width: 100%;    
    padding: ${(props) =>
        props.$solid ? "24px 48px" : "24px 48px"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    z-index: 1000;
    color: ${(props) =>
        props.$solid ? props.theme.colors.text.primary : props.theme.colors.text.white};
    transition: background-color 250ms ease, color 250ms ease, backdrop-filter 250ms ease;

    & .logoSwap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: auto;    
    }

    & .logoSwap > span {
        position: absolute !important;
        inset: 0;
    }

    & .logoImg {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        transition: opacity 250ms ease;
    }

    & .logoImgLight {
        opacity: ${(props) => (props.$solid ? 0 : 1)};
    }

    & .logoImgDark {
        opacity: ${(props) => (props.$solid ? 1 : 0)};
    }

    & .navbar {
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;

        & .lista {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;

            & .option {
                padding: 12px 16px;
                cursor: pointer;
                font-size: 16px;
                font-family: ${(props) => props.theme.fonts.primary};
                font-weight: ${(props) => props.theme.fonts.weights.medium};
                color: inherit;
                transition: color 250ms ease;
            }
        }
    }
`;

const HeaderDesktop = styled(HeaderBase)`
    @media (max-width: 768px) {
        display: none;
    }
`;

const HeaderMobile = styled(HeaderBase)`
    @media (min-width: 769px) {
        display: none;
    }
    padding: 24px 5%;

    & .btn_open_menu {
        border: 1px solid currentColor;
        border-radius: 999px;
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        transition: border-color 250ms ease;

        & .line {
            position: absolute;
            display: block;
            width: 18px;
            height: 2px;
            background: currentColor;
            opacity: 0.85;
            transition: transform 200ms ease, opacity 200ms ease;
        }

        & .line:nth-of-type(1) { transform: translateY(-5px); }
        & .line:nth-of-type(2) { transform: translateY(0); }
        & .line:nth-of-type(3) { transform: translateY(5px); }

        &.open .line:nth-of-type(1) { transform: translateY(0) rotate(45deg); }
        &.open .line:nth-of-type(2) { opacity: 0; }
        &.open .line:nth-of-type(3) { transform: translateY(0) rotate(-45deg); }
    }
`;

function HeaderLogo({ solid, width }: { solid: boolean; width: number }) {
    const height = Math.round(width * 0.4);

    return (
        <Link href="/" aria-label="Ir para a página inicial">
            <span className="logoSwap" style={{ width, height }} data-solid={solid}>
                <Image
                    className="logoImg logoImgLight"
                    src={LogoImage}
                    alt=""
                    aria-hidden
                    width={width}
                    height={height}
                    priority
                />
                <Image
                    className="logoImg logoImgDark"
                    src={LogoBlack}
                    alt=""
                    aria-hidden
                    width={width}
                    height={height}
                    priority
                />
            </span>
        </Link>
    );
}

function DesktopHeaderContent({ solid }: { solid: boolean }) {
    return (
        <>
            <HeaderLogo solid={solid} width={100} />
            <nav className="navbar">
                <ul className="lista">
                    <li className="option">
                        <Link href="/#home" scroll>
                            <Text as="span">Ínicio</Text>
                        </Link>
                    </li>
                    <li className="option">
                        <Link href="/#sobre" scroll>
                            <Text as="span">Sobre nós</Text>
                        </Link>
                    </li>
                    <li className="option">
                        <Link href="/quartos">
                            <Text as="span">Acomodações</Text>
                        </Link>
                    </li>
                    <li className="option">
                        <Link href="/#eventos" scroll>
                            <Text as="span">Eventos</Text>
                        </Link>
                    </li>
                </ul>
                <Button
                    bgColor={solid ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)"}
                    color={solid ? "rgb(255, 255, 255)" : "rgb(8, 71, 52)"}
                >
                    Reservar agora
                </Button>
            </nav>
        </>
    );
}

function MobileHeaderContent({ solid }: { solid: boolean }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);
    const handleClose = () => setOpen(false);

    const MobileLink = ({ href, title, subtitle }: { href: string; title: string; subtitle: string }) => (
        <Link href={href} onClick={handleClose} scroll>
            <Text as="span">{title}</Text>
            <Text as="p">{subtitle}</Text>
        </Link>
    );

    useEffect(() => {
        if (typeof document === "undefined") return;
        const body = document.body;
        if (open) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
        return () => {
            body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <HeaderLogo solid={solid} width={80} />
            <button
                className={`btn_open_menu ${open ? "open" : ""}`}
                onClick={handleToggle}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
            >
                <span className="line" />
                <span className="line" />
                <span className="line" />
            </button>
            <Sidebar open={open} onClose={handleClose}>
                <div className="div1">
                    <MobileLink href="/#home" title="Ínicio" subtitle="Explore a home" />
                </div>
                <div className="div2">
                    <MobileLink href="/#sobre" title="Sobre nós" subtitle="Conheça nossa história" />
                </div>
                <div className="div3">
                    <MobileLink href="/quartos" title="Acomodações" subtitle="Veja nossos quartos" />
                </div>
                <div className="div4">
                    <MobileLink href="/#eventos" title="Eventos" subtitle="Faça seu evento" />
                </div>
                <div className="div5">
                    <MobileLink href="/#local" title="Local" subtitle="Encontre-nos aqui" />
                </div>
                <div className="div6">
                    <MobileLink href="/#avaliacao" title="Avaliação" subtitle="Veja o que falam" />
                </div>
                <div className="div7">
                    <button>
                        Reservar agora
                    </button>
                </div>
            </Sidebar>
        </>
    );
}

export default function Header() {
    const router = useRouter();
    const solid = router.pathname !== "/";

    return (
        <>
            <HeaderDesktop $solid={solid}>
                <DesktopHeaderContent solid={solid} />
            </HeaderDesktop>
            <HeaderMobile $solid={solid}>
                <MobileHeaderContent solid={solid} />
            </HeaderMobile>
        </>
    );
}