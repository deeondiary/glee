'use client'
import TextInput from '@/src/components/Input/TextInput';
import React from 'react';
import Chip from "@/src/components/Chip";
import PlainButton from "@/src/components/Button/PlainButton";


function TestPage(props) {
    const print = () => {

    }
    return (
        <div>
            <div>텍스트 인풋</div>
            <TextInput placeholder='입력해주세요'/>
            <br/><br/><br/>
            <div>칩</div>
            <Chip onClick={() => print()}>{'업무보고 할게요'}</Chip>
            <br/><br/><br/>
            <div>버튼 (Plain Button)</div>
            <PlainButton aboveText="조건을 n개 더 추가하면 더 자세해져요">버튼 w 상단텍스트</PlainButton>
            <PlainButton>버튼 w/o 상단텍스트</PlainButton>
            <PlainButton disabled={true}>비활성화</PlainButton>
        </div>
    );
}

export default TestPage;