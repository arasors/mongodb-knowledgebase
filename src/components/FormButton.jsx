"use client";
import React, {memo, forwardRef, useRef} from 'react';
import {motion} from "framer-motion";
import classNames from "classnames";
import {CircularProgress} from "@mui/material";

function FormButton({
                        children,
                        onClick = () => {},
                        disabled = false,
                        reverse = false,
                        rounded = false,
                        whiteTap = 0.95,
                        fullWidth = false,
                        success = false,
                        warning = false,
                        error = false,
                        ...props
                    }, ref) {
    const buttonRef = useRef(null);

    return (
        <motion.button
            ref={ref || buttonRef}
            {...props}
            onClick={onClick}
            disabled={disabled}
            whileTap={{scale: whiteTap}}
            className={classNames("select-none",{
                "px-6 rounded-lg": !rounded,
                "rounded-full px-2": rounded,
                "flex justify-center gap-1 items-center py-2 transition-all ease-in-out group relative": true,
                "bg-slate-900 text-zinc-50 hover:text-zinc-100 disabled:hover:text-zinc-50 hover:bg-zinc-900 disabled:bg-slate-800": (!reverse && (!success && !error || (success && error && warning))) && !props?.loading,
                "bg-green-500 text-zinc-50 hover:text-zinc-100 disabled:hover:text-zinc-50 hover:bg-green-600 disabled:bg-slate-800": (!reverse && success && !error && !warning) && !props?.loading,
                "bg-rose-500 text-zinc-50 hover:text-zinc-100 disabled:hover:text-zinc-50 hover:bg-rose-600 disabled:bg-slate-800": (!reverse && !success && error && !warning) && !props?.loading,
                "bg-orange-500 text-zinc-50 hover:text-zinc-100 disabled:hover:text-zinc-50 hover:bg-orange-600 disabled:bg-slate-800": (!reverse && !success && !error && warning) && !props?.loading,
                "bg-zinc-100 text-black hover:bg-zinc-200 disabled:text-zinc-500": reverse || props?.loading,
                // "border border-solid border-zinc-900/50 disabled:border-zinc-600": (!reverse && !props?.loading) && !props?.noBorder,
                "border border-solid border-zinc-300/50 disabled:border-zinc-200": (reverse || props?.loading) && !props?.noBorder,
                "w-full": fullWidth
            })}>
            {Boolean(props?.loading) && (
                <div className={"absolute w-full h-full bg-zinc-50 top-0 left-0 flex items-center justify-center"}>
                    <CircularProgress size={18} color={"inherit"} />
                </div>
            )}
            {children}
        </motion.button>
    );
}

export default forwardRef(FormButton);
