import Head from "next/head";
import styled from "@emotion/styled";
import Link from "next/link";

import Text from "@/components/text";

const Page = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: 148px 48px 64px;

    @media (max-width: 768px) {
        padding: 124px 20px 120px;
    }
`;

const Content = styled.section`
    max-width: 860px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    & .title {
        font-size: 40px;
        line-height: 1.05;
        font-family: ${(props) => props.theme.fonts.titles};
        color: ${(props) => props.theme.colors.neutral.black.primary};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        letter-spacing: -0.5px;

        @media (max-width: 768px) {
            font-size: 28px;
        }
    }

    & .p {
        font-size: 16px;
        line-height: 1.5;
        color: ${(props) => props.theme.colors.text.secondary};
    }

    & a {
        color: ${(props) => props.theme.colors.neutral.black.primary};
        text-decoration: underline;
        text-underline-offset: 3px;
    }
`;

export default function PoliticaDePrivacidadePage() {
    return (
        <>
            <Head>
                <title>Política de Privacidade | Sítio Esperança</title>
                <meta name="description" content="Política de privacidade do Sítio Esperança." />
            </Head>

            <Page>
                <Content>
                    <Text as="h1" className="title">
                        Política de Privacidade
                    </Text>

                    <Text as="p" className="p">
                        Esta página descreve, de forma resumida, como tratamos dados pessoais quando você entra em contato
                        conosco e/ou solicita uma reserva.
                    </Text>

                    <Text as="p" className="p">
                        Podemos coletar dados como: nome, telefone (ex.: WhatsApp), datas pretendidas, quantidade de hóspedes
                        e informações necessárias para atender seu pedido.
                    </Text>

                    <Text as="p" className="p">
                        Usamos esses dados para: responder seu contato, confirmar disponibilidade, enviar informações sobre
                        reservas e prestar suporte.
                    </Text>

                    <Text as="p" className="p">
                        Se você quiser solicitar acesso/alteração/remoção de dados, fale conosco pelo WhatsApp.
                    </Text>

                    <Text as="p" className="p">
                        Voltar para <Link href="/quartos">acomodações</Link>.
                    </Text>
                </Content>
            </Page>
        </>
    );
}
