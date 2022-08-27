import RezeptForm from "../components/RezeptForm";
import styles from "../components/RezeptForm.module.css";
import React, {useState} from "react";

export default function form() {
    const [isLoading, setIsLoading] = useState(false)
    const form = React.createElement(DrugsPrescriptionForm)
    const [forms, setForms] = useState([form])
    const [prescription, setPrescription] = useState(defaultModel)
    const [errors, setErrors] = useState({})
    const [drugsPrescription, setDrugPrescriptions] = useState()

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

    const handleChange = (e) => {

    }

    return (
        <>
            <form>
                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>FirstName</span>{errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                        <input type="text" name="firstName" onChange={handleChange} value={prescription.firstName}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Lastname</span>{errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                        <input type="text" name="lastName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>ZSR</span>{errors.ZSR && <span className={styles.error}>{errors.ZSR}</span>}
                        <input type="number" name="ZSR" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Date</span>{errors.prescriptionDate && <span className={styles.error}>{errors.prescriptionDate}</span>}
                        <input type="date" name="prescriptionDate" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>HINAddress</span>
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Patient Firstname</span>{errors.patientFirstName && <span className={styles.error}>{errors.patientFirstName}</span>}
                        <input type="text" name="patientFirstName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Patient Lastname</span>{errors.patientLastName && <span className={styles.error}>{errors.patientLastName}</span>}
                        <input type="text" name="patientLastName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Birthdate</span>{errors.birthdate && <span className={styles.error}>{errors.birthdate}</span>}
                        <input type="date" name="birthdate" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>AHV-Nr.</span>{errors.AHV && <span className={styles.error}>{errors.AHV}</span>}
                        <input type="text" name="AHV" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>number of uses</span>{errors.numberOfUses && <span className={styles.error}>{errors.numberOfUses}</span>}
                        <input type="number" name="numberOfUses" onChange={handleChange}/>
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