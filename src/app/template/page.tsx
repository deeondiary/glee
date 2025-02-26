'use client'
import React from 'react';
import {useBoundStore} from "@/src/store/stores";

function TemplatePage() {
    const store = useBoundStore();
    console.log(store, 'sss')
    return (
        <div>
            템플릿
        </div>
    );
}

export default TemplatePage;