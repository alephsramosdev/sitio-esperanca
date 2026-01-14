import React from 'react';
import styled from '@emotion/styled';
import Text from '@/components/text';

import { suites } from '@/db/suites';
import SuiteCard from '@/components/cards/suite';

const SuitesContainer = styled.main`    
   width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    padding: 96px 48px;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 96px 24px 24px 24px;
    }
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

const List = styled.ul`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;

    & > li {
        width: 100%;
        list-style: none;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 14px;
    }
`

export default function Suites() {
    return <SuitesContainer>
        <Texts>
            <Text as="h1" className="title">Conheça todas as nossas suítes</Text>
            <Text as="p" className="description">Conforto e elegância em cada detalhe, um refúgio perfeito para o seu descanso.</Text>
        </Texts>
        <List>
            {suites.map((suite) => (
                <li key={suite.id}>
                    <SuiteCard
                        suite={suite}
                    />
                </li>
            ))}
        </List>
    </SuitesContainer>
}