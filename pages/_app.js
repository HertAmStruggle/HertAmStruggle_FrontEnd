import Link from "next/link"
import styles from "./_app.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../resources/Manus_Optimus_Logo.svg";

export default function App({Component, pageProps}){
    const newPageProps = {
        ...pageProps,
    }

    return (
        <>
            <Header>
                <Link href="/" passHref>
                    <img src={logo.src} alt="logo" />
                </Link>
                <h1>manus optimus</h1>
            </Header>


            <main className="page">
                <Component {...newPageProps} />
            </main>

            <Footer>
            </Footer>
        </>
    )
}