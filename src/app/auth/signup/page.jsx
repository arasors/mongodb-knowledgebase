"use client";
import React, {memo, useEffect, useState, useCallback, useRef} from "react";
import {signIn, useSession} from "next-auth/react"
import {
    TextField,
    Alert
} from "@mui/material";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {HiInformationCircle} from "react-icons/hi";
import {motion} from "framer-motion";
import toast from "react-hot-toast";
import FormButton from "@/components/FormButton";

const validationSchema = yup.object({
    password: yup
        .string("Parolanızı giriniz")
        .min(5, "Parola çok kısa")
        .required("Parolanızı giriniz"),
    email: yup
        .string("E-mail adresinizi giriniz")
        .email("Geçersiz e-mail")
        .required("E-mail adresinizi giriniz"),
    firstName: yup
        .string()
        .required("Adınızı giriniz"),
    lastName: yup
        .string()
        .required("Soyadınızı giriniz"),
});

const SignUpPage = memo(({ errors, touched, values, handleChange, setFieldValue, isValid, dirty,loaded, submitForm, isError, code: errorCode, userId, handleBlur }) => {

    const router = useRouter();
    const {data: session} = useSession();
    const submitRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        if(session?.name){

            // if(cbUrl && window){
            //     window.location.href = decodeURI(cbUrl);
            // }else{

            const cbUrl = localStorage.getItem('authCallback');
            if(cbUrl){
                if(typeof window != 'undefined') window.location.href = decodeURIComponent(cbUrl);
            }else{
                router.push('/m')
            }

            // router.push('/')
        }
    }, [session]);

    const trySignIn = useCallback(async () => {
        try {
            await signIn("credentials", {
                email: values?.email,
                password: values?.password,
                redirect: false
            });
            return true;
        }catch (err){
            return false;
        }
    }, [values?.email,values?.password]);

    useEffect(() => {
        if(userId){
            if(values?.email && values?.password){
                trySignIn();
            }else{
                router.push('/auth/signin?signUp=success')
            }
        }
    }, [userId]);


    return (
        <motion.div
            initial={{y: 10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -10, opacity: 0}}
            transition={{duration: 0.2}}
            className="w-full md:max-w-md max-w-sm mx-auto py-8 flex h-full md:items-center z-10">
            <div className={"p-4 bg-zinc-100 rounded-xl flex-1"}>
                <div className={"py-2 flex flex-col gap-1 items-start justify-center"}>

                    <h1 className={"text-xl font-bold pt-2 text-dark"}>Hesap oluştur</h1>
                    {/*<p className={"text-base text-zinc-500 pb-6"}>{t("main.store.register.description2")}</p>*/}
                    {/*<p className={"text-base text-zinc-500 pb-6"}>{t("main.store.register.description")}</p>*/}

                    {isError && (
                        <Alert
                            severity="error"
                            // icon={HiInformationCircle}
                            className={"mb-4 w-full items-center"}
                        >
                      <span>
                        <p>
                          <span className="font-medium">
                            Kayıt Başarısız
                          </span><br/>
                            {String(errorCode)}
                        </p>
                      </span>
                        </Alert>
                    )}
                    {userId && (
                        <Alert
                            severity="success"
                            // icon={HiInformationCircle}
                            className={"pb-2 mb-4 w-full items-center"}
                        >
                      <span>
                        <p>
                          <span className="font-medium">
                            Kayıt başarılı
                          </span><br/>
                            Şimdi anasayfaya yönlediriliyorsunuz
                        </p>
                      </span>
                        </Alert>
                    )}
                </div>


                {!userId && <Form className="w-full flex flex-col gap-2">


                    <div className="flex flex-row gap-1">
                        <div className="flex-1">
                            <Field
                                name="firstName"
                                as={TextField}
                                label={"Adınız"}
                                value={values.firstName}
                                onChange={handleChange}
                                autoFocus={false}
                                error={Boolean(errors.firstName && touched.firstName)}
                                helperText={<ErrorMessage name="firstName"/>}
                                fullWidth
                            />
                        </div>
                        <div className="flex-1">
                            <Field
                                name="lastName"
                                as={TextField}
                                label={"Soyadınız"}
                                value={values.lastName}
                                onChange={handleChange}
                                error={Boolean(errors.lastName && touched.lastName)}
                                helperText={<ErrorMessage name="lastName"/>}
                                fullWidth
                            />
                        </div>
                    </div>

                    <Field
                        name="email"
                        as={TextField}
                        label={"E-mail adresiniz"}
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email && touched.email)}
                        helperText={<ErrorMessage name="email"/>}
                        onKeyDown={({key}) => {
                            if (key === "Enter") passwordRef?.current?.focus();
                        }}
                        fullWidth
                    />
                    <Field
                        ref={passwordRef}
                        name="password"
                        as={TextField}
                        label={"Parolanız"}
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(errors.password && touched.password)}
                        helperText={<ErrorMessage name="password"/>}
                        onKeyDown={({key}) => {
                            if (key === "Enter") submitForm();
                        }}
                        fullWidth
                    />
                    <div className={"py-3 w-full"}>
                        <FormButton ref={submitRef} onClick={() => {
                            const errorList = Object?.values(errors);
                            if (errorList?.length > 0) toast.error(errorList?.[0], {
                                position: "top-center"
                            });

                            submitForm();
                        }} disabled={!isValid} loading={!loaded} fullWidth={true}>
                            <span className={!isValid ? "text-zinc-200" : "text-white"}>{"Kayıt ol"}</span>
                        </FormButton>
                    </div>
                </Form>}


                {!userId && <div className={"flex flex-row gap-1 justify-end w-full py-2 text-dark"}>
                    <span>Zaten hesabın var mı?</span>
                    <Link href={"/auth/signin"} className={"hover:underline hover:text-primary"}>Giriş yap</Link>
                </div>}
            </div>

        </motion.div>
);
})

const PageFormWrapper = () => {

    const [loaded, setLoaded] = useState(true);
    const [extra, setExtra] = useState({});
    const registerHandler = useCallback(async (values) => {
        const req = await fetch("/api/signup",{
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
        });

        return await req.json()
    }, []);

    const handleSubmit = useCallback(async (values) => {
        if(!loaded) return false;
        setLoaded(false);
        const saveUser = await registerHandler(values);

        setExtra(saveUser);
        setTimeout(() => setLoaded(true), 500);
    }, [loaded]);

    return(
        <Formik
            initialValues={{
                password: "",
                email: "",
                firstName: "",
                lastName: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <SignUpPage
                    {...props}
                    {...extra}
                    loaded={loaded}
                />
            )}
        </Formik>
    )
}

export default memo(PageFormWrapper);
