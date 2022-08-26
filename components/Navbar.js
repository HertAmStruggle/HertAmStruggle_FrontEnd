import styles from "./Navbar.module.css"
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Navbar() {


    return (
        <>
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/form">Form</Link></li>
                </ul>
            </nav>
        </>
    )
}