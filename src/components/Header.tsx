'use client'
import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import {COLORS} from "@/src/constants/colors";
function Header() {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <Image
                    src="/icon/chat.png"
                    width={24}
                    height={24}
                    alt="chat-icon"
                    className="cp"
                />
                <TemplateButton>
                    <Image
                        src="/icon/template.png"
                        width={18}
                        height={17}
                        alt="icon"
                    />템플릿
                    <Image
                        src="/icon/arrow_down.png"
                        width={18}
                        height={17}
                        alt="icon"
                    />
                </TemplateButton>
                <ProfilePicture>
                </ProfilePicture>
            </HeaderContainer>
        </HeaderWrapper>
    );
}
const HeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    opacity: 1;
    visibility: visible;
`
const HeaderContainer = styled.div`
    margin: 0 auto;
    max-width: 480px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 54px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #fff;
`
const TemplateButton = styled.div`
    background-color: ${COLORS.ORANGE_MD};
    border-radius: 10px;
    width: 104px;
    height: 42px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    padding: 2px 3px;
    color: ${COLORS.ORANGE};
    font-weight: 700;
`
const ProfilePicture = styled.div`
    background: #C3C6CC;
    width: 32px;
    height: 32px;
    border-radius: 50%;
`
export default Header;