"use client";
import React, {memo} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";

function Middleware({children}) {
    const {data, status} = useSession();
    const router = useRouter();

    if(status==="unauthenticated"){
        router.push("/auth/signin");
        return <></>;
    }
    return status==="authenticated" ? children : <div className={"flex-1 py-16 flex items-center justify-center"}><CircularProgress size={28} /></div>;
}

export default memo(Middleware);
