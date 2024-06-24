"use client";
import React, {memo} from 'react';
import {Avatar} from "@mui/material";
import {stringAvatar} from "@/components/StringAvatar.js";

function StringAvatar({name, ...props}) {
    return (
        <Avatar
            sx={{width: 30, height: 30}}
            variant="rounded"
            {...stringAvatar(name)}
            className={"!inline-flex"}
            {...props}
        />
    );
}

export default memo(StringAvatar);
