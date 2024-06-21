import HeroSection from "@/components/HeroSection";
import {Fragment} from "react";

export default function Layout({children}){
    return(
        <Fragment>
            <HeroSection titleShown={false}/>
            {children}
        </Fragment>
    )
}
