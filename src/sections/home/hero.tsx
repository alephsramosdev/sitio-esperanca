import Button from "@/components/button"
import Text from "@/components/text"
import styled from "@emotion/styled"
import BgImage from "@/assets/unidade/bg-hero-mobile-sitio-esperanca.jpg"
import BgImageDesktop from "@/assets/unidade/bg-hero-sitio-esperanca.jpg"

const HeroSection = styled.section`
    width: calc(100% - 16px);
    margin-top: 8px;
    background: url(${BgImageDesktop.src}) no-repeat center center;
    background-attachment: fixed;
    background-size: cover;
    min-height: calc(100vh - 16px);
    border-radius: 32px;
    padding: 48px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 48px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0px;
        width: calc(100%);
        height: 70%;
        border-radius: 32px;
        background: linear-gradient(0deg, #000000, #00000000);
        opacity: 0.8;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: calc(100%);
        border-radius: 32px;
        height: 30%;
        background: linear-gradient(0deg, #00000000, #000000);
        opacity: 0.6;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        min-height: calc(100vh - 40px);
        width: calc(100% - 10px);
        margin-top: 5px;
        justify-content: flex-end;
        padding: 24px;
        gap: 22px;
        border-radius: 32px 32px;
        background: url(${BgImage.src}) no-repeat center center;
        background-size: cover;

        &::before {
            width: calc(100%);
            height: 70%;
            opacity: 0.8;
            left: 0px;
            border-radius: 0 0 32px 32px;
        }

        &::after {
            left: 0px;
            width: calc(100%);
            top: 0px;
            border-radius: 32px 32px 0 0;
        }
    }

    & .title {
        width: 65%;
        position: relative;
        z-index: 99;

        @media (max-width: 768px) {
            width: 100%;
        }

        & > h1 {
            font-size: 82px;
            font-family: ${(props) => props.theme.fonts.primary};
            line-height: 100%;
            letter-spacing: -1px;
            color: ${(props) => props.theme.colors.text.white};

            @media (max-width: 768px) {
                font-size: 34px;
            }

            & > strong {
                font-weight: ${(props) => props.theme.fonts.weights.medium};
            }
        }
    }

    & .content {
        width: 35%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 24px;
        position: relative;
        z-index: 99;

        @media (max-width: 768px) {
            width: 100%;
        }

        & > p {
            font-size: 22px;
            line-height: 1.1;
            color: ${(props) => props.theme.colors.text.white};
            font-weight: 300;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }


    }
`

export default function Hero() {
    return <HeroSection id="home" className="hero" data-aos="fade-up" data-aos-duration="900">
        <div className="title">
            <Text as="h1">
                Viva uma experiência <strong>totalmente</strong> inesquecível
            </Text>
        </div>
        <div className="content">
            <Text as="p">
                Uma experiência confortável e de excelência para você e sua família, contamos com uma ambiente lindo e agradável em meio a natureza
            </Text>
            <Button
                bgColor="#fff"
                color="#000"
            >
                Reservar agora
            </Button>
        </div>
    </HeroSection>
}