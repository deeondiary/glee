'use client'
import React, {useEffect} from 'react';
import {getKakaoProfile} from "@/src/api/auth";
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";
import Loading from "@/src/components/loading/Loading";
import useModalManage from "@/src/hook/useModal";
import LayoutWrapper from "@/src/app/LayoutWrapper";

function KakaoRedirectPage() {
    const store = useBoundStore();
    const router = useRouter();
    const useModal = useModalManage({type: 'server-error'});
    let code = '';
    useEffect(() => {
        code = window.location.search.split('=')[1];
        getKakaoProfile(code)
            .then((data) => {
                localStorage.setItem('token', data['access_token']);
                store.setToken(data['access_token']);
                store.setNickname(data['nickname']);
                store.setProfile(data['thumbnail_image']);
            })
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                console.log(err, 'error');
                errorManage();
            })
    }, [code]);
    const errorManage = () => {
        useModal.openModal();
    }
    return (
        <LayoutWrapper>
            <Loading isPage={true} />
        </LayoutWrapper>
    );
}

export default KakaoRedirectPage;