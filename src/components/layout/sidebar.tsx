import styled from "@emotion/styled";
import React from "react";

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 900;
    opacity: 0;
    pointer-events: none;
    transition: opacity 220ms ease;

    &.open {
        opacity: 1;
        pointer-events: auto;
    }
`;

const SidebarContainer = styled.aside`
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(-8px) scale(0.98);
    opacity: 0;
    width: calc(100% - 10%);
    background: ${(props) => props.theme.colors.background.base};
    color: ${(props) => props.theme.colors.text.primary};
    border-radius: 26px;
    z-index: 999;
    border: 1px solid #00000015;
    padding: 8px 8px 8px 8px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    gap: 0px;
    pointer-events: none;
    transition: transform 220ms ease, opacity 220ms ease;

    & .div1, .div2, .div3, .div4, .div5, .div6 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 4px;
        padding: 18px 14px;
        width: 100%;

        & > a {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 4px;
            text-decoration: none;
            color: inherit;
        }

        & > a > span {
            font-family: ${(props) => props.theme.fonts.secondary};
            color: ${(props) => props.theme.colors.neutral.black.primary};
            font-weight: 500;
            line-height: 1;
            font-size: 18px;
        }

        & > a > p {
            font-family: ${(props) => props.theme.fonts.primary};
            font-weight: 300;
            line-height: 1.2;
            font-size: 12px;
            color: ${(props) => props.theme.colors.text.disabled};
        }
    }

    .div1 { grid-area: 1 / 1 / 2 / 2; border-right: 1px solid #00000015; border-bottom: 1px solid #00000015; }
    .div2 { grid-area: 1 / 2 / 2 / 3; border-bottom: 1px solid #00000015; }
    .div3 { grid-area: 2 / 1 / 3 / 2; border-right: 1px solid #00000015; border-bottom: 1px solid #00000015; }
    .div4 { grid-area: 2 / 2 / 3 / 3; border-bottom: 1px solid #00000015; }
    .div5 { grid-area: 3 / 1 / 4 / 2; border-right: 1px solid #00000015; }
    .div6 { grid-area: 3 / 2 / 4 / 3; }
    .div7 { 
        margin-top: 12px;
        grid-area: 4 / 1 / 5 / 3; 
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ${(props) => props.theme.fonts.primary};
        letter-spacing: -1px;
        font-size: 20px;
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        border-radius: 22px;
        background-color: ${(props) => props.theme.colors.neutral.black.base};
        color: ${(props) => props.theme.colors.neutral.white.base};

        & > button,
        & > a {
            letter-spacing: -1px;
        }
    }

    &.open {
        transform: translateX(-50%) translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
    }
`;

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function Sidebar({ open, onClose, children }: SidebarProps) {
    return (
        <>
            <Overlay className={open ? "open" : ""} onClick={onClose} />
            <SidebarContainer className={open ? "open" : ""} aria-hidden={!open}>
                {children}
            </SidebarContainer>
        </>
    );
}