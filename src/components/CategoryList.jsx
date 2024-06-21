"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import { IoLayersOutline } from "react-icons/io5";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories(){
            const res = await fetch(`/api/article`);
            const data = await res.json();

            setCategories(data);
        }

        getCategories();
    }, []);

    return (
        <div className="container mx-auto my-8 flex flex-wrap justify-center flex-1 -translate-y-20">
            {categories && categories.map((category) => (
                <Link href={`/${category?._id}`} key={category._id} className="p-1 md:w-1/3 w-full flex">
                    <div className={"flex-1 p-4 rounded-xl bg-zinc-100 flex flex-col items-center hover:drop-shadow-lg shadow-black/10 hover:-translate-y-1 transition-all ease-in-out border-solid border border-transparent hover:border-blue-500"}>
                        <IoLayersOutline size={35} className={"text-blue-500"} />
                        <h2 className="text-2xl font-semibold mb-2">{category._id}</h2>
                        <p className={"text-blue-500"}>{category.articles?.length || 0} Makale</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryList;
