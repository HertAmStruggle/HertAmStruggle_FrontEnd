import styles from "./RezeptForm.module.css"
import {useState} from "react";

export default function RezeptForm() {

    const handleSubmit = async (e) => {

    }

    const handleChange = async (e) => {

    }

    return (
        <>
            <fieldset className={styles.inputGroup}>

                <label className={styles.customField}>
                    <span>DrugName</span>
                    <input type="text" name="name" onChange={handleChange}/>
                </label>

                <label className={styles.customField}>
                    <span>Schedule</span>
                    <span>Morning</span>
                    <input type="checkbox" name="name" onChange={handleChange}/>
                    <span>Noon</span>
                    <input type="checkbox" name="name" onChange={handleChange}/>
                    <span>Evening</span>
                    <input type="checkbox" name="name" onChange={handleChange}/>
                    <span>Night</span>
                    <input type="checkbox" name="name" onChange={handleChange}/>
                    <span>Other</span>
                    <input type="text" name="name" onChange={handleChange}/>
                </label>

                <label className={styles.customField}>
                    <span>number of uses</span>
                    <input type="number" name="name" onChange={handleChange}/>
                </label>

            </fieldset>
        </>
    )
}