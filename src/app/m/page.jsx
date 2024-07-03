"use client";
import {memo, useEffect} from "react";
import {useRouter} from "next/navigation";

function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push("/m/article")
    }, []);

    return (
        <div></div>
    );
}

export default memo(Page);
