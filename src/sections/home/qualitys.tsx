import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import ReserveNowButton from "@/components/reserve-now-button";
import Text from "@/components/text";
import Image from "next/image";

import Cama from '@/assets/icons/cama.svg';
import Morro from '@/assets/icons/morro.svg';
import Estrela from '@/assets/icons/estrela.svg';
import Pet from '@/assets/icons/pet.svg';

const float = keyframes`
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(0) rotate(10deg); }
    100% { transform: translateY(0) rotate(-10deg); }
`;

const QualityContainer = styled.section`
    width: 100%;
    padding: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        padding: 48px 24px;
    }

    & .texts {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        gap: 26px;
        width: 50%;

        @media (max-width: 768px) {
            width: 100%;
        }

        & .title {
            font-size: 62px;
            line-height: 1;
            font-weight: ${(props) => props.theme.fonts.weights.medium};
            font-family: ${(props) => props.theme.fonts.titles};
            color: ${(props) => props.theme.colors.neutral.black.primary};
            letter-spacing: -1px;

            & > strong {
                font-weight: ${(props) => props.theme.fonts.weights.medium};
                color: ${(props) => props.theme.colors.primary.base};
            }

            @media (max-width: 768px) {
                font-size: 36px;
            }
        }

        & .description {
            font-size: 20px;
            line-height: 1.2;
            color: ${(props) => props.theme.colors.text.primary};
            width: 80%;

            @media (max-width: 768px) {
                width: 100%;
                font-size: 16px;
            }

            & > strong {
                font-weight: ${(props) => props.theme.fonts.weights.medium};
                color: ${(props) => props.theme.colors.neutral.black.primary};
            }
        }
    }

    & .cards {
        width: 50%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 32px;
        grid-row-gap: 32px;

        @media (max-width: 768px) {
            width: 100%;
            grid-column-gap: 12px;
            grid-row-gap: 24px;
        }

        .card1 { grid-area: 1 / 1 / 2 / 2; }
        .card2 { grid-area: 1 / 2 / 2 / 3; }
        .card3 { grid-area: 2 / 1 / 3 / 2; }
        .card4 { grid-area: 2 / 2 / 3 / 3; }

        & .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;    
            gap: 18px;
            padding-bottom: 28px;
            position: relative;

            &::before {
                content: "";
                width: 80%;
                height: 75%;
                position: absolute;
                bottom: 0;
                left: 10%;
                border-radius: 32px;
                background: #F0F0F0;
                z-index: -1;

                @media (max-width: 768px) {
                    width: 100%;
                    left: 0;
                }
            }

            & .card_icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 82px;
                height: 82px;
                border-radius: 999px;
                background-color: ${(props) => props.theme.colors.primary.base};
                

                @media (max-width: 768px) {
                    width: 64px;
                    height: 64px;
                }

                & > img {
                    animation: ${float} 4s ease-in-out infinite alternate-reverse;
                    @media (max-width: 768px) {
                        width: 32px;
                        height: 32px;
                    }
                }
            }

            & .card_title {
                font-size: 24px;
                font-family: ${(props) => props.theme.fonts.titles};
                color: ${(props) => props.theme.colors.neutral.black.primary};
                width: 50%;
                text-align: center;
                line-height: 1;
                letter-spacing: -1px;

                @media (max-width: 768px) {
                    font-size: 18px;
                    width: 75%;
                }
            }

            .card1 .card_icon { animation-delay: 0s; }
            .card2 .card_icon { animation-delay: 0.15s; }
            .card3 .card_icon { animation-delay: 0.3s; }
            .card4 .card_icon { animation-delay: 0.45s; }
        }
    }
`

export default function QualitysSection() {
    return <QualityContainer id="sobre" data-aos="fade-up" data-aos-duration="800">
        <aside className="texts">
            <Text as="h1" className="title">A <strong>hospedagem</strong> que você sonhava é real</Text>
            <Text as="p" className="description">
                Situado em <strong>Miguel Pereira</strong>, a cidade mais visitada do estado do <strong>Rio de Janeiro</strong>, oferecemos uma estádia de excelência e qualidade, garantindo conforto e uma <strong>experiência inesquecível!</strong>
            </Text>
            <ReserveNowButton bgColor="#084734" color="#fff" />
        </aside>

        <article className="cards">
            <div className="card card1">
                <div className="card_icon">
                    <Image src={Cama} alt="icone-cama" />
                </div>
                <Text as="h4" className="card_title">Quartos de luxo</Text>
            </div>
            <div className="card card2">
                <div className="card_icon">
                    <Image src={Morro} alt="icone-morro" />
                </div>
                <Text as="h4" className="card_title">Vistas deslumbrantes</Text>
            </div>
            <div className="card card3">
                <div className="card_icon">
                    <Image src={Estrela} alt="icone-estrela" />
                </div>
                <Text as="h4" className="card_title">Qualidade incomparável</Text>
            </div>
            <div className="card card4">
                <div className="card_icon">
                    <Image src={Pet} alt="icone-pet" />
                </div>
                <Text as="h4" className="card_title">100% Pet Friendly</Text>
            </div>
        </article>
    </QualityContainer>;
}