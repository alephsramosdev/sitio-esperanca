import MomentCard from "@/components/cards/moment";
import Text from "@/components/text";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";

import imageExample from "@/assets/unidade/hero-op-1.jpg";
import setaParaDireita from "@/assets/icons/seta-para-direita.svg";
import Image from "next/image";
import { buildReservationHref } from "@/utils/reservations";

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

const MomentContainer = styled.section`
    width: 100%;
    padding: 48px;
    background-color: ${(props) => props.theme.colors.neutral.white.base};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 48px;

    @media (max-width: 768px) {
        gap: 32px;
        padding: 48px 24px;
    }

    & .carousel {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    & .nav-button {
        border: 2px solid ${(props) => props.theme.colors.background.base};
        background: ${(props) => props.theme.colors.neutral.white.base};
        width: 68px;
        height: 68px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        cursor: pointer;
        z-index: 2;
        transition: transform 150ms ease, box-shadow 150ms ease;

        @media (max-width: 768px) {
            width: 56px;
            height: 56px;
        }

        & img {
            width: 42px;
            height: 42px;

            @media (max-width: 768px) {
                width: 32px;
                height: 32px;
            }
        }
    }

    & .nav-prev {
        left: -2.5%;
        transform: rotate(180deg);

        @media (max-width: 768px) {
            left: -5%;
        }
    }

    & .nav-next {
        right: -2.5%;

        @media (max-width: 768px) {
            right: -5%;
        }
    }

    & .texts {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        @media (max-width: 768px) {
            align-items: flex-start;
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
            color: ${(props) => props.theme.colors.text.secondary};
            text-align: center;

            @media (max-width: 768px) {
                text-align: left;
                font-size: 16px;
            }
        }
    } 
`;

const slides = [
    {
        image: Piscina,
        alt: "Piscina enorme do sitio esperança",
        title: "Piscina enorme",
    },
    {
        image: PetFriendly,
        alt: "O sitio esperança é 100% Pet friendly",
        title: "Pet friendly",
    },
    {
        image: QuintalVerde,
        alt: "Quintal verde do sitio esperança",
        title: "Quintal verde",
    },
    {
        image: Sala,
        alt: "Sala de estar do sitio esperança",
        title: "Sala de estar",
    },
    {
        image: CampoFutebol,
        alt: "Campo de Futebol do sitio esperança",
        title: "Campo de Futebol",
    },
    {
        image: PingPong,
        alt: "Mesa de Ping Pong do sitio esperança",
        title: "Mesa de Ping Pong",
    },
    {
        image: Sinuca,
        alt: "Mesa de Sinuca do sitio esperança",
        title: "Mesa de Sinuca",
    },
    {
        image: Toto,
        alt: "Mesa de Toto do sitio esperança",
        title: "Mesa de Toto",
    },
    {
        image: Jogos,
        alt: "Mesa de Jogos do sitio esperança",
        title: "Mesa de Jogos",
    },
    {
        image: EspacoCrianca,
        alt: "Espaço Criança do sitio esperança",
        title: "Espaço para Criança",
    },
];

export default function MomentsSection() {
    const swiperRef = useRef<SwiperClass | null>(null);

    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();

    return (
        <MomentContainer id="o-que-fazer" data-aos="fade-up" data-aos-duration="800">
            <article className="texts">
                <Text as="h1" className="title">Viva <strong>momentos</strong> marcantes</Text>
                <Text as="p" className="description">Temos diversas atrações espalhadas por todo o nosso espaço</Text>
            </article>

            <div className="carousel">
                <button type="button" onClick={handlePrev} className="nav-button nav-prev" aria-label="Anterior">
                    <Image src={setaParaDireita} alt="anterior" />
                </button>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={1}
                    spaceBetween={24}
                    loop={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3.6,
                            spaceBetween: 24,
                        },
                    }}
                    style={{ width: "100%" }}
                >
                    {slides.map((item) => (
                        <SwiperSlide key={item.title}>
                            <MomentCard
                                image={item.image}
                                alt_image={item.alt}
                                onClick={() => {
                                    if (typeof window === "undefined") return;
                                    const link = buildReservationHref();
                                    window.open(link.href, "_blank", "noopener,noreferrer");
                                }}
                            >
                                {item.title}
                            </MomentCard>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button type="button" onClick={handleNext} className="nav-button nav-next" aria-label="Próximo">
                    <Image src={setaParaDireita} alt="próximo" />
                </button>
            </div>
        </MomentContainer>
    );
}