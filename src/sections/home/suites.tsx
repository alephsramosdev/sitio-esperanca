import Button from "@/components/button";
import Text from "@/components/text";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

import seta from "@/assets/icons/seta-para-direita.svg";
import SuiteCard from "@/components/cards/suite";

import { suites } from "@/db/suites";

const SuitesContainer = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    padding: 48px;
    flex-direction: column;
    gap: 48px;

    @media (max-width: 768px) {
        padding:48px 24px;
        gap: 48px;
    }

    &::before {
        content: '';
        width: 95%;
        height: 30%;
        position: absolute;
        top: 0;
        left: 2.5%;
        border-radius: 48px;
        background-color: ${(props) => props.theme.colors.background.base};
        z-index: -1;

        @media (max-width: 768px) {
            border-radius: 32px;
            height: 40%;
        }
    }

    & .texts {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 26px;
        }
        
        & .title {
        width: 100%;
        position: relative;
        z-index: 99;
        font-size: 62px;
        font-family: ${(props) => props.theme.fonts.titles};
        line-height: 100%;
        letter-spacing: -1px;
        text-align: center;
        color: ${(props) => props.theme.colors.neutral.black.primary};

            @media (max-width: 768px) {
                width: 100%;
                font-size: 36px;
                width: 100%;
            }
        }
    }

    & .actions {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 24px;
        }

        & .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 24px;

            @media (max-width: 768px) {
                flex-direction: column;
                gap: 12px;
            }

            & .button-no-bg {
                width: 260px;
            }
        }

        & .controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;

            @media (max-width: 768px) {
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
                padding: 8px;

                &:nth-child(1){
                    transform: rotate(180deg);
                }
            }
        }
    }
`

const Carousel = styled.div`
    width: 100%;
    position: relative;

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

            &:nth-child(1){
                transform: rotate(180deg);
            }
        }
    }
`

export default function Suites() {
    const swiperRef = useRef<SwiperClass | null>(null);

    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();

    return <SuitesContainer data-aos="fade-up" data-aos-duration="800">
        <aside className="texts">
            <Text as="h1" className="title">
                Conheça nossas acomodações
            </Text>
        </aside>
        <Carousel>
            <Swiper
                slidesPerView={1}
                spaceBetween={24}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                }}
                style={{ width: "100%" }}
            >
                {suites.map((suite) => (
                    <SwiperSlide key={suite.id}>
                        <SuiteCard
                            suite={suite}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="controls">
                <button type="button" onClick={handlePrev} aria-label="Anterior">
                    <Image src={seta} alt="Seta para esquerda" />
                </button>
                <button type="button" onClick={handleNext} aria-label="Próximo">
                    <Image src={seta} alt="Seta para direita" />
                </button>
            </div>
        </Carousel>
        <aside className="actions">
            <div className="buttons">
                <Button
                    className="button-no-bg"
                    bgColor="#053122"
                    color="#fffce0"
                >
                    Conhecer todas as suítes
                </Button>
            </div>
            <div className="controls">
                <button type="button" onClick={handlePrev} aria-label="Anterior">
                    <Image src={seta} alt="Seta para esquerda" />
                </button>
                <button type="button" onClick={handleNext} aria-label="Próximo">
                    <Image src={seta} alt="Seta para direita" />
                </button>
            </div>
        </aside>
    </SuitesContainer>
}