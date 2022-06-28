import { useEffect } from "react";

const Page404 = () => {
    useEffect(() => {
        document.title = "Page not found";
    }, []);

    return (
        <div>Page not found :(</div>
    )
}

export default Page404;