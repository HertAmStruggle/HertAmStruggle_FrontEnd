import Link from "next/link"
import "./_app.css"
import Header from "../components/Header";

export default function App(){
    return (
        <>
            <Header>
                <Link href="/" passHref>
                    Hert Am Struggle!
                </Link>
            </Header>
        </>
    )
}