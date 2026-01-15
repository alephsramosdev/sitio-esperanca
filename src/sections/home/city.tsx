import styled from "@emotion/styled";

import ReserveNowButton from "@/components/reserve-now-button"
import Text from "@/components/text";

import Img1 from "@/assets/city/example.png";
import Img2 from "@/assets/city/example-mobile.png";
import Image from "next/image";

const CityContainer = styled.section`
    width: 100%;
    margin-top: 12px;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0px;
    position: relative;
`

const Texts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
    padding: 48px;

    @media (max-width: 768px) {
        padding: 24px;
    }

    & .title {
        font-size: 62px;
        line-height: 1;
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        letter-spacing: -1px;
        width: 70%;
        text-align: center;

        & > strong {
            font-weight: ${(props) => props.theme.fonts.weights.medium};
            color: ${(props) => props.theme.colors.primary.base};
        }

        @media (max-width: 768px) {
            font-size: 32px;
            width: 100%;
        }
    }

    & .description {
        font-size: 20px;
        text-align: center;
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.2;

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`

const Images = styled.div`
    width: 100%;
    height: 800px;
    position: relative;
    top: -300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -200px;
    z-index: -1;

    @media (max-width: 768px) {
        height: 600px;
        top: -60px;
        margin-bottom: -50px;
    }

    & .image-desktop {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;

        @media (max-width: 768px) {
            display: none;
        }
    }

    & .image-mobile {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        display: none;

        @media (max-width: 768px) {
            display: block;
        }
    }

`

export default function City() {
    return <CityContainer id="local" data-aos="fade-up" data-aos-duration="800">
        <Texts>
            <Text as="h1" className="title">
                Aproveita <strong>atividades pela cidade</strong> de Miguel Pereira
            </Text>
            <Text as="p" className="description">
                Uma cidade cheia de pontos turisticos, é passeio o dia todo!
            </Text>
            <ReserveNowButton bgColor="#084734" color="#fff" />
        </Texts>
        <Images>
            <Image
                className="image-desktop"
                src={Img1}
                alt="Imagem da cidade"
                fill
                sizes="100vw"
                priority
            />
            <Image
                className="image-mobile"
                src={Img2}
                alt="Imagem da cidade (mobile)"
                fill
                sizes="100vw"
                priority
            />
        </Images>
    </CityContainer>
}