import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'react-hot-toast'
const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Mongo Knowledgebase",
    description: "Your perfect description",
};

export default function RootLayout({children}) {
    return (
        <html lang="tr">
        <body className={inter.className}>
        <Toaster />
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
