import DrugsPrescriptionForm from "../components/DrugsPrescriptionForm";
import styles from "./form.module.css";
import React, {useState} from "react";

const defaultModel = {
    "firstName": "",
    "lastName": "",
    "ZSR": 0,
    "email": "",
    "prescriptionDate": "",
    "patientFirstName": "",
    "patientLastName": "",
    "birthdate": "",
    "AHV": "",
    "numberOfUses": 0,
    "drugsPrescription": [],
}

const errors = {}

function validateModel(prescription) {
    let isValid = true

    if (prescription.firstName.trim().length === 0) {
        errors.firstName = "Firstname can't be empty!"
        isValid = false
    }

    if (prescription.lastName.trim().length === 0) {
        errors.lastName = "Lastname can't be empty!"
        isValid = false
    }

    if (prescription.ZSR < 1) {
        errors.ZSR = "ZSR is not valid!"
        isValid = false
    }

    if (!isRegexValid(prescription.email.trim(), "\\S+@(hin|HIN)\\.\\S+")) {
        errors.email = "Invalid HIN address format!"
        isValid = false;
    } else { errors.email = null }

    if (prescription.prescriptionDate.trim().length === 0) {
        errors.prescriptionDate = "Date of the prescription can't be empty!"
        isValid = false;
    }

    if (prescription.patientFirstName.trim().length === 0) {
        errors.patientFirstName = "The firstname of the patient can't be empty!"
        isValid = false;
    }

    if (prescription.patientLastName.trim().length === 0) {
        errors.patientLastName = "The lastname of the patient can't be empty!"
        isValid = false;
    }

    if (prescription.birthdate.trim().length === 0) {
        errors.birthdate = "The birthdate can't be empty!"
        isValid = false;
    }

    if (isRegexValid(prescription.AHV.trim(), "756.\\d{4}.\\d{4}.\\d{2}")) {
        errors.AHV = "Invalid AHV format!"
        isValid = false;
    } else { errors.AHV = null }

    if (prescription.numberOfUses < 1) {
        errors.numberOfUses = "number of uses must be positive!"
        isValid = false;
    }

    console.log(errors.email)
    return {errors, isValid}
}

function isRegexValid(string, regex) {
    return string.match(regex)
}

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

        const name = e.target.name
        const value = e.target.value

        if (name === "drugsPrescription") {
            setDrugPrescriptions({
                ...prescription,
                drugsPrescription: [
                    {
                        "id": (value)
                    }
                ]
            })
        } else if (name === "firstName") {
            setPrescription({
                ...prescription,
                firstName: value
            })
        } else if (name === "lastName") {
            setPrescription({
                ...prescription,
                lastNameName: value
            })
        } else if (name === "ZSR") {
            setPrescription({
                ...prescription,
                ZSR: value
            })
        } else if (name === "date") {
            setPrescription({
                ...prescription,
                date: value
            })
        } else if (name === "email") {
            setPrescription({
                ...prescription,
                email: value
            })
        } else if (name === "patientFirstName") {
            setPrescription({
                ...prescription,
                patientFirstName: value
            })
        } else if (name === "patientLastName") {
            setPrescription({
                ...prescription,
                patientLastName: value
            })
        } else if (name === "birthdate") {
            setPrescription({
                ...prescription,
                birthdate: value
            })
        } else if (name === "AHV") {
            setPrescription({
                ...prescription,
                AHV: value
            })
        } else if (name === "numberOfUses") {
            setPrescription({
                ...prescription,
                numberOfUses: value
            })
        } else {
            setPrescription({
                ...prescription,
                [name]: value
            })
        }

        const result = validateModel(prescription);
        if(!result.isValid) {
            setErrors(result.errors);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const result = validateModel(prescription)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
    }

    console.log(forms);

    return (
        <>
            <form name="contactForm" onSubmit={handleSubmit}>
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
                        <span>HIN address</span>{errors.email && <span className={styles.error}>{errors.email}</span>}
                        <input type="text" name="email" onChange={handleChange} value={prescription.email}/>
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