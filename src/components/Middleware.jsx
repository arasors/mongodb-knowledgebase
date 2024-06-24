"use client";
import React, {memo} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

function Middleware({children}) {
    const {data} = useSession();
    const router = useRouter();

    if(!data?.sub){
        router.push("/auth/signin");
        return <></>;
    }
    return children;
}

export default memo(Middleware);
