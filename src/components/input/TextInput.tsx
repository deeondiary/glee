'use client'
import React, {useRef} from 'react';
import styled from "styled-components";
import {COLORS} from "@/src/constants/colors";

interface InputProps {
    value: string | undefined;
    placeholder?: string;
    onChange: () => void;
}

function TextInput(props: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <InputWrapper>
            <Input contentEditable="true" value={props.value} onChange={props.onChange} placeholder={props.placeholder}
                        ref={inputRef}/>
        </InputWrapper>
    );
}
const InputWrapper = styled.div`
    min-width: 100%;
    background-color: ${COLORS.GR_10};
    border: 1px solid ${COLORS.GR_BORDER};
    border-radius: 8px;
    line-height: 18px;
    font-size: 13px;
    padding: 17px 20px;
    min-height: 52px;
    max-height: 142px;
    overflow-y: hidden;
`
const Input = styled.div`
    border: none;
    overflow-y: auto;
    max-height: 108px;
    &:focus {
        outline: none;
    }
`
export default TextInput;