import Button from "@/components/button"
import Text from "@/components/text"
import styled from "@emotion/styled"
import BgImage from "@/assets/unidade/hero-op-4.jpg"
import BgImageDesktop from "@/assets/unidade/hero-op-3.jpg"

const HeroSection = styled.section`
    width: 100%;
    background: url(${BgImageDesktop.src}) no-repeat center center;
    background-size: cover;
    min-height: calc(100vh - 20px);
    border-radius: 0 0 112px 112px;
    padding: 5%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 32px;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70%;
        border-radius: 0 0 112px 112px;
        background: linear-gradient(0deg, #000000, #00000000);
        opacity: 0.8;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
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
        padding: 10% 5%;
        gap: 22px;
        border-radius: 32px 32px;
        background: url(${BgImage.src}) no-repeat center center;
        background-size: cover;

        &::before {
            width: calc(100% - 10px);
            height: 70%;
            opacity: 0.8;
            left: 5px;
            border-radius: 0 0 32px 32px;
        }

        &::after {
            left: 5px;
            width: calc(100% - 10px);
            top: 5px;
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
                color: ${(props) => props.theme.colors.secondary.base};
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
            font-family: ${(props) => props.theme.fonts.secondary};
            color: ${(props) => props.theme.colors.text.white};
            font-weight: 300;

            @media (max-width: 768px) {
                font-size: 16px;
            }
        }


    }
`

export default function Hero() {
    return <HeroSection>
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