import {Inter} from "next/font/google";
import "./globals.css";
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-icons/styles/bootstrap5.css';
import '@syncfusion/ej2-buttons/styles/bootstrap5.css';
import '@syncfusion/ej2-splitbuttons/styles/bootstrap5.css';
import '@syncfusion/ej2-inputs/styles/bootstrap5.css';
import '@syncfusion/ej2-lists/styles/bootstrap5.css';
import '@syncfusion/ej2-navigations/styles/bootstrap5.css';
import '@syncfusion/ej2-popups/styles/bootstrap5.css';
import '@syncfusion/ej2-richtexteditor/styles/bootstrap5.css';
import Navbar from "@/components/Navbar";
import {Toaster} from 'react-hot-toast'
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESC,
};

export default function RootLayout({children}) {
    return (
        <html lang="tr">
        <body className={inter.className}>
        <AuthProvider>
            <Toaster/>
            <Navbar/>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
