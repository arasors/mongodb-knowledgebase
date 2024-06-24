"use client";
import React, {memo, useEffect, useState, useCallback, Fragment, useRef} from "react";
import {FcGoogle} from "react-icons/fc";
import {BsMicrosoft, BsTwitter} from "react-icons/bs";
import {BsGithub} from "react-icons/bs";
import {getProviders, signIn, signOut, useSession} from "next-auth/react"
import {useRouter, useSearchParams} from "next/navigation";
import {AiOutlineArrowRight, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import Link from "next/link";
import {HiInformationCircle, HiOutlineMail} from "react-icons/hi";
import {AnimatePresence, motion} from "framer-motion";
import {CircularProgress, IconButton, InputAdornment, TextField, Alert} from "@mui/material";
import {FaSquareFacebook} from "react-icons/fa6";
import FormButton from "@/components/FormButton";


function Page() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const router = useRouter();
    const {data: user} = useSession();
    const searchParams = useSearchParams();

    const [loaded, setLoaded] = useState(false);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const [passwordErr, setPasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [alert, setAlert] = useState(false);
    const [submitLoaded, setSubmitLoaded] = useState(false);

    const [providers, setProviders] = useState([]);
    const getAuthProviders = useCallback(async () => {
        const p = await getProviders();
        setProviders(p);
    }, []);

    useEffect(() => {
        getAuthProviders()
    }, [])

    const signHandler = useCallback(async (provider) => {
        setAlert(false);
        if(provider==="credentials"){

            try {
                if(!email){
                    setEmailErr(true);
                    emailRef?.current?.focus()
                    return false;
                }else{
                    setEmailErr(false);
                }
                if(!password){
                    setPasswordErr(true);
                    passwordRef?.current?.focus()
                    return false;
                }else{
                    setPasswordErr(false);
                }
                const res = await signIn(provider, {
                    email,
                    password,
                    redirect: false
                });

                if(res?.error){
                    setAlert("failure");
                }else{
                    setAlert("success")
                }

                return Promise.resolve()
            }catch (err){
                console.log(err?.message || err)
                return Promise.resolve()
            }

        }else{
            await signIn(provider);
            return Promise.resolve()
            //setAlert("success");
        }
    }, [email, password, emailRef?.current, passwordRef?.current]);

    const submitHandler = useCallback(async (provider) => {
        setSubmitLoaded(provider?.id)
        await signHandler(provider?.id);
        setTimeout(() => (setSubmitLoaded(false)), 1000)
    }, [signHandler]);

    useEffect(() => {
        const cbUrl = searchParams.get("callbackUrl");

        if(cbUrl){
            localStorage.setItem('authCallback', decodeURIComponent(cbUrl));
        }
    }, [searchParams]);

    useEffect(() => {
        if(user) {
            // if(cbUrl && window){
            //     window.location.href = decodeURI(cbUrl);
            // }else{
            const cbUrl = localStorage.getItem('authCallback');
            if(cbUrl && !cbUrl?.includes("auth/signout")){
                if(typeof window != 'undefined') window.location.href = decodeURIComponent(cbUrl);
            }else{
                router.push('/m')
            }

            // }
            setLoaded(true);
        }else{
            setLoaded(true);
        }
    }, [user]);

    return (
        <div className="w-full md:max-w-md max-w-sm mx-auto h-full flex md:items-center py-8 z-10">

            {loaded ? (
                <div className={"p-4 bg-zinc-100 rounded-xl flex-1"}>
                    <div className={"py-2"}>
                        <div className={"py-2 flex flex-col gap-1 items-start justify-center"}>

                            <h1 className={"text-2xl py-2 font-bold text-center text-dark "}>Oturum aç</h1>
                        </div>

                        {!alert && searchParams.get("signUp") === "success" && (
                            <Alert
                                severity="success"
                                icon={HiInformationCircle}
                                className={"pb-2 items-center"}
                            >
                      <span>
                        <p className={"text-dark"}>
                          <span className="font-medium text-dark">
                            Başarıyla kayıt oldunuz
                          </span><br/>
                            Şimdi anasayfaya yönlendiriliyorsunuz
                        </p>
                      </span>
                            </Alert>
                        )}


                        {alert && (
                            <Alert
                                severity={alert==="success"?"success":"error"}
                                // icon={HiInformationCircle}
                                className={"pb-2 items-center"}
                            >
                      <span>
                        <p>
                          <span className="font-medium">
                            {alert === "success" ? "Giriş Başarılı" : "Giriş başarısız"}
                          </span><br/>
                            {alert === "success" ? "Şimdi anasayfaya yönlendiriliyorsunuz" : "E-mail adresinizi ve parolanızı kontrol ediniz"}
                        </p>
                      </span>
                            </Alert>
                        )}

                    </div>

                    <AnimatePresence mode='wait'>

                        <motion.div
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -10, opacity: 0}}
                            transition={{duration: 0.2}}
                            className={"py-2 flex flex-col gap-2"}
                        >
                            {providers && Object.values(providers).map((provider) => (
                                <Fragment key={provider.name}>
                                    {provider?.id === "credentials" && (
                                        <div className={"py-2 flex flex-col gap-2"}>
                                            <TextField
                                                name="email"
                                                label={"E-mail adresiniz"}
                                                type={"email"}
                                                ref={emailRef}
                                                value={email}
                                                error={emailErr}
                                                onChange={(e) => setEmail(e.target.value)}
                                                fullWidth
                                                required
                                            />
                                            <TextField
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                label={"Parolanız"}
                                                onChange={(e) => setPassword(e.target.value)}
                                                ref={passwordRef}
                                                value={password}
                                                error={passwordErr}
                                                fullWidth
                                                required
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") submitHandler(provider);
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                                                {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                        </div>
                                    )}

                                    {provider?.id === "credentials" && (
                                        <div className={"flex flex-row gap-1 justify-end w-full pb-4"}>

                                            {/*<div className={"flex flex-col flex-1 text-dark"}>*/}
                                            {/*    <span>Sorun mu yaşıyorsun?</span>*/}
                                            {/*    <Link href={"/auth/forgot"}*/}
                                            {/*          className={"hover:underline hover:text-primary"}>Şifremi unuttum</Link>*/}
                                            {/*</div>*/}

                                            <div className={"flex flex-col flex-1 text-dark"}>
                                                <span>Hesabın yok mu?</span>
                                                <Link href={"/auth/signup"}
                                                      className={"hover:underline hover:text-primary"}>Hesap oluştur</Link>
                                            </div>

                                        </div>
                                    )}

                                    <FormButton
                                        // className={classNames({
                                        //     "w-full group rounded-lg dark:bg-zinc-100 bg-black text-zinc-100 dark:text-zinc-950 border border-transparent px-5 py-4 transition-colors flex gap-2 justify-between items-center": true,
                                        //     "hover:opacity-95": true
                                        // })}
                                        reverse={submitLoaded}
                                        onClick={() => submitHandler(provider)}
                                        disabled={submitLoaded}
                                    >
                                        <div className={"flex-1 flex justify-between py-1 items-center"}>
                                            <h2 className={`text-base font-semibold pointer-events-none flex gap-2`}>
                                                {provider?.id === "google" && <FcGoogle size={25}/>}
                                                {provider?.id === "facebook" &&
                                                    <FaSquareFacebook size={25} color={"#1871ED"}/>}
                                                {provider?.id === "twitter" && <BsTwitter size={25}/>}
                                                {provider?.id === "github" && <BsGithub size={25}/>}
                                                {provider?.id === "azure-ad" && <BsMicrosoft size={25}/>}
                                                {provider?.id === "credentials" && <HiOutlineMail size={25}/>}
                                                {provider?.id === "credentials" ? "Giriş Yap" : "ile giriş yap"}
                                            </h2>
                                            <span
                                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none pointer-events-none">
                                    {(submitLoaded && submitLoaded === provider?.id) ? (
                                        <CircularProgress color={"inherit"} size={20}/>) : (
                                        <AiOutlineArrowRight size={20}/>)}
                                </span>
                                        </div>
                                    </FormButton>

                                </Fragment>
                            ))}
                        </motion.div>

                    </AnimatePresence>
                </div>
            ) : (
                <CircularProgress size={28} />
            )}

        </div>
    );
}

export default memo(Page);
