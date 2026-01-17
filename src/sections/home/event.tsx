import Button from "@/components/button";
import Text from "@/components/text";
import styled from "@emotion/styled";
import { buildReservationHref } from "@/utils/reservations";

import Casamento from "@/assets/event/event-casamento-sitio-esperanca.jpeg";
import CasamentoMobile from "@/assets/event/casamento-sitio-esperanca.jpeg";

const EventContainer = styled.section`
    width: calc(100% - 24px);
    padding: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${Casamento.src});
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 32px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 32px;
        background: rgba(5, 45, 34, 0.2);
        z-index: 1;

        @media (max-width: 768px) {
            display: none;
        }
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80%;
        background: linear-gradient(to top, rgba(5, 45, 34, 0.9), transparent);
        border-radius: 0 0 32px 32px;
        display: none;

        @media (max-width: 768px) {
            display: block;
        }
    }

    @media (max-width: 768px) {
        background-image: url(${CasamentoMobile.src});
        padding: 24px;
    }

    & .content {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        position: relative;
        z-index: 2;

        @media (max-width: 768px) {
            align-items: flex-end;
            justify-content: flex-end;
            text-align: center;
            padding: 5%;
        }
    }
`

const Texts = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
    width: 40%;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 200px;
        align-items: center;
        text-align: center;
        gap: 12px;
    }

    & .title {
        font-size: 62px;
            line-height: 1;
            font-weight: ${(props) => props.theme.fonts.weights.medium};
            font-family: ${(props) => props.theme.fonts.titles};
            color: ${(props) => props.theme.colors.text.white};
            letter-spacing: -1px;

        @media (max-width: 768px) {
            font-size: 36px;
        }
    }

    & .description {
        font-size: 20px;
        line-height: 1.2;
        color: ${(props) => props.theme.colors.text.white};

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`


export default function Event() {
    return <EventContainer id="eventos" data-aos="fade-up" data-aos-duration="800">
        <main className="content">
            <Texts>
                <Text as="h1" className="title">
                    Faça o seu evento conosco
                </Text>
                <Text as="p" className="description">
                    Um lugar lindo e maravilhoso, realize momentos mágicos junto a sua família e amigos. Conte com nossa equipe para tornar seu evento inesquecível.
                </Text>
                <Button
                    bgColor="#fff"
                    color="#000"
                    href={buildReservationHref().href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Saiba mais
                </Button>
            </Texts>
        </main>
    </EventContainer>;
}