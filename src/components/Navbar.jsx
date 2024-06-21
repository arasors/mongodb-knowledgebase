"use client";
import Link from 'next/link';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"} className="text-white text-lg font-semibold">Help Center</Link>
                <div>
                    <Link href="/" className="text-gray-300 hover:text-white mx-2">
                        Anasayfa
                    </Link>
                    {process.env.NEXT_PUBLIC_CONTACT_URL && <a className="text-gray-300 hover:text-white mx-2" target={"_blank"}
                        href={`https://${process.env.NEXT_PUBLIC_CONTACT_URL}`}>
                        İletişim
                    </a>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
