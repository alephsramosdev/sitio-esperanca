import ReserveNowButton from "@/components/reserve-now-button";
import Text from "@/components/text";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import AssessmentCard from "@/components/cards/assessment";
import Image from "next/image";
import setaParaDireita from "@/assets/icons/seta-para-direita.svg";

import Beatriz from "@/assets/assessment/beatriz.png";
import Luis from "@/assets/assessment/luiz.png";
import Debora from "@/assets/assessment/debora.png";
import Fabiano from "@/assets/assessment/fabiano.png";
import Matheus from "@/assets/assessment/matheus.png";
import Michel from "@/assets/assessment/michel.png";

const AssessmentContainer = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 48px;
    height: auto;
    padding: 48px 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 32px;
        padding: 24px;
    }
`

const Texts = styled.div`
    padding-left: 5%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;

    @media (max-width: 768px) {
        width: 100%;
        padding-left: 0;
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

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }

`

const Carousel = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 768px) {
        width: 100%;
    }

    & .swiper {
        width: 100%;
    }

    & .nav-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 10% 12px 24px;

        @media (max-width: 768px) {
            padding: 12px 24px;
        }
    }

    & .nav-buttons {
        display: flex;
        align-items: center;
        gap: 8px;

        & .prev {
            transform: rotate(180deg);
        }
    }

    & .nav-btn {
        border: 1px solid ${(props) => props.theme.colors.neutral.gray[300]};
        background: ${(props) => props.theme.colors.neutral.white.base};
        padding: 12px;
        border-radius: 999px;
        cursor: pointer;

        & > img {
            width: 24px;
            height: 24px;
        }
    }

    & .fraction {
        font-family: ${(props) => props.theme.fonts.titles};
        font-size: 16px;
        color: ${(props) => props.theme.colors.text.secondary};
    }
`

const slides = [
    {
        assessment: "Adoramos a diária! O ambiente é aconchegante, com cama e travesseiros confortáveis, ar e TV ótimos. O banheiro é uma graça, com chuveiro quentinho e toalhas macias. O lugar é lindo! A recepção do Davi, Robinho e os AUmigos foi a cereja do bolo. Indicamos muito e com certeza vamos voltar...",
        name: "Maria Silva",
        time: 2,
    },
    {
        assessment: "O ambiente é muito familiar e acolhedor, nos sentimos em casa. Sendo 100% pet friendly, fomos super bem recebidos com nossas cachorras. Saímos apaixonados pelo mascote Chiclete, que nos recebia do café da manhã até a hora de dormir. Foi uma experiência de hospedagem maravilhosa!!...",
        name: "Beatriz Smith",
        image: Beatriz,
        time: 5,
    },
    {
        assessment: "Excelente! Estive lá hoje em um aniversário e gostei demais. Mesmo morando muito perto, na Rua Maurício Silveira, e passando em frente todos os dias, eu não conhecia o local. Com certeza vou recomendar aos amigos! O jardim é lindo, queria muito descobrir o contato do jardineiro...",
        image: Luis,
        name: "Luis Antonio Pestana",
        time: 2,
    },
    {
        assessment: "Eu e minha família nos sentimos em casa graças ao acolhimento do Davi, sempre carinhoso e disponível. O quarto estava cheiroso, banheiro impecável e roupas de cama limpas. A piscina estava limpa e o salão de jogos equipado. Café da manhã simples, mas satisfatório. Voltaria 1000 vezes...",
        image: Debora,
        name: "Debora Fontes",
        time: 7,
    },
    {
        assessment: "O ambiente é familiar, acolhedor e nada comercial. Fomos super bem recebidos pelo Davi. Tudo é impecável: quartos limpos, roupa de cama cheirosa e ótima localização. O ponto alto é ser 100% pet friendly, com acesso total! Tem piscina, hidro e jogos. Amamos e voltaremos com certeza...",
        name: "Susana Queiroz",
        time: 9,
    },
    {
        assessment: "O Sítio Esperança é maravilhoso, bem perto do centro e do Parque dos Dinos. Um lugar seguro, de uma paz incrível, onde só se ouvem os passarinhos. A limpeza é impecável, mas o grande destaque são os atendentes: nunca vi pessoas tão atenciosas, simpáticas e prestativas. Voltaremos...",
        name: "Eliane Magal",
        time: 4,
    },
    {
        assessment: "A experiência foi muito boa! Os quartos são novos e extremamente confortáveis, garantindo um ótimo descanso. O local é simplesmente lindo, mas o atendimento do Davi é o verdadeiro diferencial de lá. Ele é muito educado e prestativo, sempre disposto a ajudar no que fosse preciso...",
        image: Fabiano,
        name: "Fabiano Oliveira",
        time: 6,
    },
    {
        assessment: "A experiência nesse lugar foi simplesmente maravilhosa!! Encontramos pessoas extremamente educadas e muito receptivas desde a nossa chegada. Percebe-se que tudo ali é muito bem cuidado em cada detalhe, além das suítes que são lindas e confortáveis. Uma estadia realmente incrível...",
        name: "Robson da Silva",
        time: 12,
    },
    {
        assessment: "O local é super agradável, com um ambiente familiar e muito amigável. A estadia foi muito boa, simplesmente excelente! É o espaço ideal para quem quer relaxar e se sentir em casa. O acolhimento faz toda a diferença e torna a experiência ainda melhor. Recomendamos demais...",
        image: Matheus,
        name: "Matheus Batista",
        time: 8,
    },
    {
        assessment: "A experiência foi top demais! O lugar é incrível, super bem cuidado e com um atendimento nota dez. Nos sentimos muito acolhidos e aproveitamos cada momento nesse ambiente especial. É o destino perfeito para quem busca relaxar e curtir a natureza com conforto. Recomendamos muito...",
        image: Michel,
        name: "Michel Vieira",
        time: 1,
    },
];

export default function Assessment() {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [index, setIndex] = useState(0);

    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();

    return (
        <AssessmentContainer id="avaliacao" data-aos="fade-up" data-aos-duration="800">
            <Texts>
                <Text as="h1" className="title">
                    Nota <strong>máxima</strong> no Google, um paraíso!
                </Text>
                <Text as="p" className="description">
                    Todos esses feedbacks foram retirados diretamente do google, podendo ser acessados a qualquer momento
                </Text>
                <ReserveNowButton bgColor="#084734" color="#fff" />
            </Texts>

            <Carousel>
                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={16}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => setIndex(swiper.realIndex)}
                    loop={false}
                >
                    {slides.map((item, i) => (
                        <SwiperSlide key={`${item.name}-${i}`}>
                            <AssessmentCard
                                assessment={item.assessment}
                                name={item.name}
                                time={item.time}
                                image={item.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="nav-row">
                    <div className="fraction">{index + 1} / {slides.length}</div>
                    <div className="nav-buttons">
                        <button type="button" onClick={handlePrev} className="nav-btn prev" aria-label="Anterior">
                            <Image src={setaParaDireita} alt="anterior" />
                        </button>
                        <button type="button" onClick={handleNext} className="nav-btn next" aria-label="Próximo">
                            <Image src={setaParaDireita} alt="próximo" />
                        </button>
                    </div>
                </div>
            </Carousel>
        </AssessmentContainer>
    );
}