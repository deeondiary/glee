import {UiState} from "../store/ui-store";

export const dateTimeFormat = (originalDate: string) => {
    const date = originalDate.split('T')[0].split('-');
    return `${date[0]}.${date[1]}.${date[2]}`;
}

export const copyTextUtil = (nodeId: string, store: UiState) => {
    const contents = document.getElementById(nodeId);
    try {
        if (contents) {
            navigator.clipboard.writeText(contents.innerText);
            store.setToastText('복사되었습니다.');
            store.setToastShow(true);
        }
    } catch (e) {
        console.log(e);
        window.alert(e)
    }
}