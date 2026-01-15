import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Text from "./text";

type ButtonStyleProps = {
    color?: string;
    bgColor?: string;
};

const buttonBase = css<ButtonStyleProps>`
    border: none;
    font-size: 18px;
    width: 162px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-family: ${(props) => props.theme.fonts.primary};
    letter-spacing: -1px;
    font-weight: ${(props) => props.theme.fonts.weights.medium};
    background: ${({ bgColor }) => bgColor || "#000"};
    color: ${({ color }) => color || "#fff"};
    position: relative;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        scale: 1.02;

        & .text_static {
            top: 200%;
        }

        & .text_hover {
            top: 50%;
        }
    }

    &:active {
        scale: 1;
    }

    & .text_static {
        position: absolute;
        z-index: 2;
        transition: all 0.2s ease-in-out;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
    }

    & .text_hover {
        position: absolute;
        left: 50%;
        top: -50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        transition: all 0.2s ease-in-out;
    }
`;

const ButtonStyleButton = styled.button<ButtonStyleProps>`
    ${buttonBase}
`;

const ButtonStyleAnchor = styled.a<ButtonStyleProps>`
    ${buttonBase}
`;

type ButtonBaseProps = ButtonStyleProps & {
    children?: React.ReactNode;
    className?: string;
};

type ButtonAsButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
};

type ButtonAsAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

export type ButtonProps = ButtonBaseProps & (ButtonAsButtonProps | ButtonAsAnchorProps);

export default function Button({
    children,
    color,
    bgColor,
    className,
    ...props
}: ButtonProps) {
    if ("href" in props && typeof props.href === "string") {
        const { href, ...anchorProps } = props;

        return (
            <ButtonStyleAnchor
                href={href}
                bgColor={bgColor}
                color={color}
                className={className}
                {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                <Text as="span" className="text_static">
                    {children}
                </Text>
                <Text as="span" className="text_hover">
                    {children}
                </Text>
            </ButtonStyleAnchor>
        );
    }

    return (
        <ButtonStyleButton
            bgColor={bgColor}
            color={color}
            className={className}
            type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || "button"}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            <Text as="span" className="text_static">
                {children}
            </Text>
            <Text as="span" className="text_hover">
                {children}
            </Text>
        </ButtonStyleButton>
    );
}