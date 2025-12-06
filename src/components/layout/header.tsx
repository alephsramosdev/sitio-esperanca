import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import LogoImage from "@/assets/logotipo/logo.svg";
import Bars from "@/assets/icons/bars.svg";
import Text from "../text";
import Button from "../button";
import Sidebar from "./sidebar";

const HeaderBase = styled.header`
    width: 100%;
    padding: 12px 2.5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    z-index: 1000;

    & .logotipo {
        width: 120px;
        height: auto;
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
                color: ${(props) => props.theme.colors.text.white};
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

    & .logotipo {
        width: 80px;
    }

    & .btn_open_menu {
        border: 1px solid ${(props) => props.theme.colors.neutral.white.primary};
        border-radius: 999px;
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & .bars {
            width: 18px;
            height: auto;
            color: #ffffff75;
            fill: #ffffff75;
        }
    }
`;

function DesktopHeaderContent() {
    return (
        <>
            <Image className="logotipo" src={LogoImage} alt="logo-do-sitio-esperanca" />
            <nav className="navbar">
                <ul className="lista">
                    <li className="option">
                        <Text as="span">Ínicio</Text>
                    </li>
                    <li className="option">
                        <Text as="span">Sobre nós</Text>
                    </li>
                    <li className="option">
                        <Text as="span">Acomodações</Text>
                    </li>
                    <li className="option">
                        <Text as="span">Eventos</Text>
                    </li>
                </ul>
                <Button bgColor="rgb(255, 252, 224)" color="rgb(8, 71, 52)">
                    Reservar agora
                </Button>
            </nav>
        </>
    );
}

function MobileHeaderContent() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Image className="logotipo" src={LogoImage} alt="logo-do-sitio-esperanca" />
            <button className="btn_open_menu" onClick={handleOpen}>
                <Image className="bars" src={Bars} alt="menu" />
            </button>
            <Sidebar open={open} onClose={handleClose}>
                <div className="div1">
                    <Text as="span">Ínicio</Text>
                    <Text as="p">Explore a home</Text>
                </div>
                <div className="div2">
                    <Text as="span">Sobre nós</Text>
                    <Text as="p">Conheça nossa história</Text>
                </div>
                <div className="div3">
                    <Text as="span">Acomodações</Text>
                    <Text as="p">Veja nossos quartos</Text>
                </div>
                <div className="div4">
                    <Text as="span">Eventos</Text>
                    <Text as="p">Faça seu evento</Text>
                </div>
                <div className="div5">
                    <Text as="span">Local</Text>
                    <Text as="p">Encontre-nos aqui</Text>
                </div>
                <div className="div6">
                    <Text as="span">Avaliação</Text>
                    <Text as="p">Veja o que falam</Text>
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
    return (
        <>
            <HeaderDesktop>
                <DesktopHeaderContent />
            </HeaderDesktop>
            <HeaderMobile>
                <MobileHeaderContent />
            </HeaderMobile>
        </>
    );
}