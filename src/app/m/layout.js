import Middleware from "@/components/Middleware";

export default function Layout({children}) {
    return (
        <Middleware>
            {children}
        </Middleware>
    );
}
