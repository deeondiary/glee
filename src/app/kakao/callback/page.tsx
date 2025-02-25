'use client'
import React, {useEffect} from 'react';
import {getKakaoProfile} from "@/src/api/auth";
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";
import Loading from "@/src/components/loading/Loading";

function KakaoRedirectPage() {
    const store = useBoundStore();
    const router = useRouter();

    useEffect(() => {
        const code = window.location.search.split('=')[1];
        getKakaoProfile(code)
            .then((data) => {
                store.setToken(data['access_token']);
                store.setNickname(data['nickname']);
                store.setProfile(data['thumbnail_image']);
            })
            .then(() => {
                router.push('/');
            })
    })

    return (
        <Loading />
    );
}

export default KakaoRedirectPage;