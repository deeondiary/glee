'use client'
import React, {useState} from 'react';
import styled from "styled-components";
import {COLORS} from "@/src/constants/colors";

interface ChipProps {
    children: string;
    onClick?: () => void | undefined;
    active?: boolean;
}
function Chip(props: ChipProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const handleClick = () => {
        console.log('no ??', isActive)
        setIsActive(!isActive);
        props.onClick();
    }
    return (
        <ChipContainer onClick={handleClick} $active={isActive}>
            <ChipText>{props.children}</ChipText>
        </ChipContainer>
    );
}
const ChipContainer = styled.div<{active: string}>`
    background-color: ${(p) => p.active === 'active' ? COLORS.ORANGE_LIGHT : COLORS.GR_20};
    cursor: pointer;
    padding: 20px;
    border-radius: 34px;
    border: 1px solid ${COLORS.GR_20};
    display: inline-block;
    border-color: ${(p) => p.active === 'active' ? COLORS.ORANGE : COLORS.GR_20};
`
const ChipText = styled.span`
    font-weight: 600;
    font-size: 13px;
`
export default Chip;