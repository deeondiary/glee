import {useUiStore} from "@/src/store/ui-store";

interface UseTagProps {
    tags: Array<string>;
    setTags: (tags: Array<string>) => void;
}
const useTagManage = (props: UseTagProps) => {
    const onClickTag = (tag: string) => {
        if (props.tags.includes(tag)) {
            const index = props.tags.indexOf(tag);
            props.tags.splice(index, 1);
            props.setTags([...props.tags]);
        } else if (props.tags.length < 2) {
            const newArr = [...props.tags];
            newArr.push(tag);
            props.setTags(newArr);
        } else {
            // 토스트 알림
        }
    }
    const uiStore = useUiStore();
    const onCloseTagEdit = () => {
        uiStore.setTagEditShow(false);
        // TODO 태그 저장 api호출
    }
    return ({
        onClickTag,
        onCloseTagEdit
    })
}

export default useTagManage;