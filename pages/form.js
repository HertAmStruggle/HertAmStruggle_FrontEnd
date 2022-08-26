import RezeptForm from "../components/RezeptForm";
import styles from "../components/RezeptForm.module.css";
import React, {useState} from "react";

export default function form() {
    const [isLoading, setIsLoading] = useState(false)
    const form = React.createElement(RezeptForm)
    const [forms, setForms] = useState([form])

    //const forms = [form]

    const addForm = async (e) => {
        setForms(forms.concat   (form))
    }

    const removeForm = async (e) => {
        if (forms.length === 1){
            alert("You need to add at least one drug")
        } else {
            setForms(forms.splice(-1))
        }
    }

    const handleChange = async (e) => {

    }

    return (
        <>
            <form>
                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Firstname</span>
                        <input type="text" name="id" onChange={handleChange}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Lastname</span>
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>

                    <label className={styles.customField}>
                        <span>ZSR</span>
                        <input type="number" name="name" onChange={handleChange}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Date</span>
                        <input type="date" name="name" onChange={handleChange}/>
                    </label>

                    <label className={styles.customField}>
                        <span>HINAddress</span>
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>
                </fieldset>

                {forms}

                <input type={"button"} value={"Add Form"} onClick={addForm}/>
                <input type={"button"} value={"Remove Form"} onClick={removeForm}/>

                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>

            </form>
        </>
    )
}