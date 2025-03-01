import React from 'react';
import SelectIfImage from "@/src/app/_select/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/_choice-image/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/_choice-image/SelectUploadImageResult";
import SelectResult from "@/src/app/_select/SelectResult";
import TemplateRequested from "@/src/app/_select/TemplateRequested";
import SelectWriteDetail from "@/src/app/_select/_choice-image/SelectWriteDetail";
import SelectOptionsLayout from "@/src/app/_select/_choice-select/SelectOptionsLayout";
import styles from './SelectLayout.module.css'

function SelectLayout() {
    const store = useBoundStore();
    const renderPage = () => {
        let component;
        switch (store.currentStep) {
            case 0:
                component = <SelectIfImage />
                break;
            case 1:
                if (store.selectChoice === 'image') {
                    component = <SelectUploadImage/>
                } else {
                    component = <SelectOptionsLayout/>
                }
                break;
            case 2:
                component = <SelectUploadImageResult/>
                break;
            case 3:
                component = <SelectWriteDetail/>
                break;
            case 4:
                component = <TemplateRequested/>
                break;
            case 5:
                component = <SelectResult/>
                break;
        }
        return component;
    }
    return (
        <div className={styles.wrapper}>
            { renderPage() }
        </div>
    );
}

export default SelectLayout;