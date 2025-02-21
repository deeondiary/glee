import React from 'react';
import styled from "styled-components";
import {COLORS} from "@/src/constants/colors";

interface ButtonProps {
    children: string;
    aboveText?: string;
    disabled?: boolean;
}
function PlainButton(props: ButtonProps) {
    return (
        <ButtonArea>
            <ButtonAboveText>
                {props.aboveText}
            </ButtonAboveText>
            <Button disabled={props.disabled}>{props.children}</Button>
        </ButtonArea>
    );
}
const ButtonArea = styled.div`
    padding: 12px 20px;
    background-color: white;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`
const ButtonAboveText = styled.span`
    text-align: center;
    margin-bottom: 9px;
    text-decoration: underline;
    color: ${COLORS.GR_80}
`
const Button = styled.button`
    height: 56px;
    background-color: ${COLORS.GR_100};
    border-radius: 8px;
    padding: 20px;
    color: ${COLORS.GR_10};
    width: 100%;
    font-size: 16px;
    &:disabled {
        color: ${COLORS.GR_40};
        background-color: ${COLORS.GR_80};
    }
`
export default PlainButton;