"use client";
import {useParams} from "next/navigation";
import {Fragment, useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Link from "next/link";
import {FaHome} from "react-icons/fa";
import {BsChevronRight} from "react-icons/bs";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {ImFileText2} from "react-icons/im";
import HeroSection from "@/components/HeroSection";


const Article = () => {
    const {slug} = useParams();
    const [category, setCategory] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function getCategory() {
            const res = await fetch(`/api/article`);
            const data = await res.json();

            const result = data?.find(f => f?._id === decodeURI(slug));
            if (result) setCategory(result);
            else setNotFound(true);
        }

        getCategory();
    }, [slug]);

    if (!category && !notFound) {
        return <div className={"flex-1 flex items-center justify-center"}><CircularProgress/></div>;
    }


    return (
        <div className="container mx-auto my-8 flex-1">
            {notFound ? (
                <p>Kategori bulunamadı</p>
            ) : (
                <Fragment>
                    <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: 4}}>
                        <Link href="/">
                            <FaHome size={18}/>
                        </Link>
                        <Typography color="text.primary">{decodeURI(slug)}</Typography>
                    </Breadcrumbs>


                    <h1 className="text-3xl font-bold mb-4">{category?._id}</h1>

                    <div className="flex flex-col gap-3">
                        {category?.articles && category.articles.map((article, idx) => (
                            <Link key={idx} href={`/${slug}/${article.slug}`}
                                  className="text-zinc-900 hover:text-blue-600 px-5 py-8 rounded-xl bg-zinc-100 hover:drop-shadow-sm shadow-black/5 border-solid border border-zinc-200 hover:border-blue-500 flex justify-between group">
                                <div className={"flex gap-2 items-center"}>
                                    <ImFileText2 size={20} className={"text-zinc-900 group-hover:text-blue-600"}/>
                                    <span
                                        className={"flex-1 whitespace-nowrap overflow-ellipsis text-lg font-medium"}>{article?.title}</span>
                                </div>
                                <div>
                                    <BsChevronRight size={25}
                                                    className={"text-zinc-800/80 -translate-x-3 group-hover:translate-x-0 transition-all ease-in-out"}/>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Article;
