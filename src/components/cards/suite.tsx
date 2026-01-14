import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Text from "../text";
import Button from "../button";
import type { IconType } from "react-icons";
import { MdBathtub, MdBed, MdKingBed, MdMeetingRoom, MdPeople } from "react-icons/md";

import type { Suite } from "@/db/suites";

const CardContainer = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    gap: 18px;

    & > img {
        width: 100%;
        height: 680px;
        border-radius: 12px;
        object-fit: cover;
        position: relative;
        z-index: -1;
        filter: contrast(120%) brightness(80%) saturate(140%);

        @media (max-width: 768px) {
            height: 620px;
        }
    }

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        background: linear-gradient(to top, #f5f5f5, transparent);
        z-index: 0;

        @media (max-width: 768px) {
            height: 40%;
        }
    }
`

const Absolute = styled.div`
    position: absolute;
    left: 24px;
    bottom: 24px;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;    
    flex-direction: column;
    gap: 18px;
    padding-bottom: 12px;
    
    @media (max-width: 768px) {
        left: 16px;
        bottom: 16px;
    }

    & .button {
        padding: 12px 24px;
        width: max-content;
        background-color: ${(props) => props.theme.colors.neutral.white.base};
        width: calc(100% - 24px);
        position: relative;
        color: ${(props) => props.theme.colors.neutral.black.base};
        border-radius: 8px;
        font-weight: 500;
    }

    & .suite_name {
        font-size: 28px;
        color: ${(props) => props.theme.colors.neutral.white.base};
        font-weight: ${(props) => props.theme.fonts.weights.medium};
        font-family: ${(props) => props.theme.fonts.titles};
        letter-spacing: -1px;
        font-weight: 400;
    }

    & .location {
        font-size: 16px;
        color: ${(props) => props.theme.colors.neutral.white.base};
        font-weight: ${(props) => props.theme.fonts.weights.light};
        margin-top: -24px;
        line-height: 1.2;
    }
`

const Amenities = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 4px;
    }
`

const Amenity = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 4px 6px;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.neutral.white.base};
    font-size: 12px;
    line-height: 1;
    background-color: #00000085;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    & svg {
        flex: none;
        width: 14px;
        height: 14px;
    }
`

interface AmenityChipProps {
    icon: IconType;
    label: string;
}

function AmenityChip({ icon: Icon, label }: AmenityChipProps) {
    return (
        <Amenity>
            <Icon size={16} />
            <span>{label}</span>
        </Amenity>
    );
}


interface SuiteCardProps {
    suite: Suite;
}

export default function SuiteCard({
    suite,
}: SuiteCardProps) {
    const getAmenity = (id: string) => suite.amenities.find((a) => a.id === id);

    const tv = getAmenity("tv");
    const air = getAmenity("air-conditioning");
    const wifi = getAmenity("wifi");
    const refrigerator = getAmenity("refrigerator");
    const coffeeMaker = getAmenity("coffee-maker");
    const chairs = getAmenity("chairs");

    return <CardContainer>
        <Image src={suite.images[0]} alt={suite.name || 'Imagem da suíte'} width={400} height={400} />
        <Absolute>
            <Text as="h2" className="suite_name">{suite.name}</Text>

            <Amenities aria-label="Amenidades principais">
                <AmenityChip icon={MdMeetingRoom} label={`${suite.rooms} quarto${suite.rooms > 1 ? "s" : ""}`} />
                <AmenityChip icon={MdPeople} label={`${suite.persons} pessoas`} />
                <AmenityChip icon={MdBathtub} label={`${suite.bathroom} banheiro${suite.bathroom > 1 ? "s" : ""}`} />
                <AmenityChip icon={MdBed} label={`${suite.bed} cama${suite.bed > 1 ? "s" : ""}`} />
                {suite.bedType ? <AmenityChip icon={MdKingBed} label={suite.bedType} /> : null}
                {refrigerator && <AmenityChip icon={refrigerator.icon} label={refrigerator.label} />}
                {coffeeMaker && <AmenityChip icon={coffeeMaker.icon} label={coffeeMaker.label} />}
                {air && <AmenityChip icon={air.icon} label={air.label} />}
            </Amenities>

            <Link className="button" href={`/quartos/${suite.id}`} aria-label={`Conhecer a ${suite.name}`}>
                Conhecer a {suite.name}
            </Link>
        </Absolute>
    </CardContainer>
}