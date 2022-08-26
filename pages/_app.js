import Link from "next/link"
import "./_app.css"
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function App({Component, pageProps}){
    const newPageProps = {
        ...pageProps,
    }

    return (
        <>
            <Header>
                <Link href="/" passHref>
                    Hert Am Struggle!
                </Link>
            </Header>

            <Navbar/>

            <main className="page">
                <Component {...newPageProps} />
            </main>
        </>
    )
}