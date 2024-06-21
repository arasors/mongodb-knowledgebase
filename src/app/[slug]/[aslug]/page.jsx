"use client";
import {useParams} from "next/navigation";
import {Fragment, useEffect, useState} from "react";
import {Button, CircularProgress} from "@mui/material";
import Link from "next/link";
import {FaHome} from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Image from "next/image";
import toast from 'react-hot-toast'

const Article = () => {
    const {slug, aslug} = useParams();
    const [article, setArticle] = useState(null);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        async function getArticle() {
            const res = await fetch(`/api/article?slug=${aslug}`);
            const data = await res.json();

            setArticle(data);
        }

        getArticle();
    }, [aslug]);

    if (!article) {
        return <div className={"flex-1 flex items-center justify-center"}><CircularProgress/></div>;
    }

    return (
        <div className="container mx-auto my-8">
            <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 4}}>
                <Link href="/">
                    <FaHome size={18}/>
                </Link>
                <Link
                    href={`/${slug}`}
                >
                    {decodeURI(slug)}
                </Link>
                <Typography color="text.primary">{article?.title}</Typography>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className={"min-h-56"}>
                <p dangerouslySetInnerHTML={{__html: article.content}}/>
            </div>


            <div className={"py-4 flex flex-col gap-4 items-center"}>
                <p className={"text-zinc-900"}>Bu makale size yardımcı oldu mu?</p>

                {feedback!==null ? (
                    <div className={"flex gap-8"}>
                        <p className={"font-medium text-green-600"}>Görüşünü paylaştığın için teşekkürler.</p>
                    </div>
                ) : (
                    <div className={"flex gap-8"}>
                        <Button onClick={() => {
                            toast.success("Teşekkürler", {
                                position: "bottom-center"
                            });
                            setFeedback(1);
                        }}>
                            <Image src={"/up.svg"} alt={"like"} width={100} height={100}
                                   className={"pointer-events-none scale-50"}/>
                        </Button>
                        <Button onClick={() => {
                            toast.success("Teşekkürler", {
                                position: "bottom-center"
                            });
                            setFeedback(0);
                        }}>
                            <Image src={"/down.svg"} alt={"like"} width={100} height={100}
                                   className={"pointer-events-none scale-50"}/>
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Article;
