"use client";
import React, {memo} from 'react';
import {useParams} from "next/navigation";

function Page() {
    const params = useParams();

    return (
        <div className="container mx-auto my-8 flex flex-wrap justify-center">
            <h3 className={"text-lg font-medium"}>{params?.id === "new" ? "Yeni makale" : "Makaleyi düzenle"}</h3>

        </div>
    );
}

export default memo(Page);
