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

export default function TermosECondicoesPage() {
    return (
        <>
            <Head>
                <title>Termos e Condições | Sítio Esperança</title>
                <meta name="description" content="Termos e condições do Sítio Esperança." />
            </Head>

            <Page>
                <Content>
                    <Text as="h1" className="title">
                        Termos e Condições
                    </Text>

                    <Text as="p" className="p">
                        Ao solicitar uma reserva, você concorda em fornecer informações corretas (datas e número de
                        hóspedes) para que possamos verificar disponibilidade e valores.
                    </Text>

                    <Text as="p" className="p">
                        Valores e disponibilidade podem variar conforme a data e estão sujeitos à confirmação.
                    </Text>

                    <Text as="p" className="p">
                        Regras específicas (check-in/check-out, políticas de cancelamento, pets, eventos, etc.) podem ser
                        informadas no atendimento e passam a valer após a confirmação.
                    </Text>

                    <Text as="p" className="p">
                        Em caso de dúvidas, fale conosco pelo WhatsApp antes de concluir.
                    </Text>

                    <Text as="p" className="p">
                        Voltar para <Link href="/quartos">acomodações</Link>.
                    </Text>
                </Content>
            </Page>
        </>
    );
}
