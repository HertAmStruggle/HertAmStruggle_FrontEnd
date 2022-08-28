import styles from "./index.module.css";
import React, {useState} from "react";
import {createPrescription} from "../lib/api";


const defaultModel = {
    "firstName": "",
    "lastName": "",
    "zsrCode": 0,
    "hinEmailAddress": "",
    "prescriptionDate": "",
    "expirationDate": "",
    "patientFirstName": "",
    "patientLastName": "",
    "birthdate": "",
    "AHV": "",
    "numberOfUses": 0,
    "drugPrescriptions": [],
}

const defaultDrugPrescription = {
    "atcCode": "",
    "morning": "",
    "noon": "",
    "evening": "",
    "night": "",
    "other": "",
}

const errors = {}

function validateModel(prescription) {
    let isValid = true

    if (prescription.firstName.trim().length === 0) {
        errors.firstName = "Firstname can't be empty!"
        isValid = false
    } else { errors.firstName = null }

    if (prescription.lastName.trim().length === 0) {
        errors.lastName = "Lastname can't be empty!"
        isValid = false
    } else { errors.lastName = null }

    if (prescription.zsrCode < 1) {
        errors.zsrCode = "ZSR is not valid!"
        isValid = false
    } else { errors.zsrCode = null }

    if (!isRegexValid(prescription.hinEmailAddress.trim(), "\\S+@(hin|HIN)\\.\\S+")) {
        errors.hinEmailAddress = "Invalid HIN address format!"
        isValid = false;
    } else { errors.hinEmailAddress = null }

    if (prescription.prescriptionDate.trim().length === 0) {
        errors.prescriptionDate = "Date of the prescription can't be empty!"
        isValid = false;
    } else { errors.prescriptionDate = null }

    if (prescription.expirationDate.trim().length === 0) {
        errors.expirationDate = "Expiration date can't be empty!"
        isValid = false;
    } else { errors.expirationDate = null }

    if (prescription.patientFirstName.trim().length === 0) {
        errors.patientFirstName = "The firstname of the patient can't be empty!"
        isValid = false;
    } else { errors.patientFirstName = null }

    if (prescription.patientLastName.trim().length === 0) {
        errors.patientLastName = "The lastname of the patient can't be empty!"
        isValid = false;
    } else { errors.patientLastName = null }

    if (prescription.birthdate.trim().length === 0) {
        errors.birthdate = "The birthdate can't be empty!"
        isValid = false;
    } else { errors.birthdate = null }

    if (isRegexValid(prescription.AHV.trim(), "756.\\d{4}.\\d{4}.\\d{2}")) {
        errors.AHV = "Invalid AHV format!"
        isValid = false;
    } else { errors.AHV = null }

    if (prescription.numberOfUses < 1) {
        errors.numberOfUses = "number of uses must be positive!"
        isValid = false;
    } else { errors.numberOfUses = null }

    console.log(isValid);
    console.log(errors);

    return {errors, isValid}
}

function isRegexValid(string, regex) {
    return string.match(regex);
}

function convertDrugPrescriptions(drugPrescriptions) {
    let result = []
    for(let drugPres of drugPrescriptions) {
        let newDrugPres = {
            atcCode: drugPres.atcCode,
            schedule: ""
        }
        let schedule = ""
        if(drugPres.morning !== "") {
            schedule = schedule.concat(drugPres.morning, ", ");
        }
        if(drugPres.noon !== "") {
            schedule = schedule.concat(drugPres.noon, ", ");
        }
        if(drugPres.evening !== "") {
            schedule = schedule.concat(drugPres.evening, ", ");
        }
        if(drugPres.night !== "") {
            schedule = schedule.concat(drugPres.night, ", ");
        }
        if(drugPres.other !== "") {
            schedule = schedule.concat(drugPres.other);
        }
        newDrugPres.schedule = schedule;
        result.push(newDrugPres);
    }
    return result;
}

export default function form() {
    const [isLoading, setIsLoading] = useState(false)
    const [serviceList, setServiceList] = useState([{...defaultDrugPrescription}]);
    const [prescription, setPrescription] = useState(defaultModel)
    const [errors, setErrors] = useState({})

    const handleServiceAdd = () => {
        setServiceList([...serviceList, {...defaultDrugPrescription}]);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleScheduleChange = (e, index) => {
        if (e.target.hasOwnProperty("checked")){
            if(e.target.checked) {
                serviceList[index][e.target.name] = e.target.name;
            } else {
                serviceList[index][e.target.name] = "";
            }
        } else {
            if(e.target.value !== "") {
                serviceList[index][e.target.name] = e.target.value;
            } else {
                serviceList[index][e.target.name] = e.target.value;
            }
        }

        prescription.drugPrescriptions = convertDrugPrescriptions(serviceList);
    }

    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        prescription.drugPrescriptions = convertDrugPrescriptions(serviceList);

        setPrescription({
            ...prescription,
            [name]: value
        })

        const result = validateModel(prescription);
        if(!result.isValid) {
            setErrors(result.errors);
        }
    }

    const handleSubmit = async (e) => {
        console.log(prescription)

        prescription.drugPrescriptions = convertDrugPrescriptions(serviceList);

        e.preventDefault()
        setIsLoading(true)

        const result = validateModel(prescription)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
        } else {
            const newPrescription = await createPrescription(JSON.stringify(prescription))
            alert("Prescription created!")
            //router.push(/prescription/${newPrescription.id})
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    return (
        <>
            <form name="contactForm" onSubmit={handleSubmit} className={styles.formMain}>
                <fieldset className={styles.inputGroup}>
                    <h2>Angaben Arzt</h2>
                    <div className={styles.twoInputs}>
                        <label className={styles.customField}>
                            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                            <input type="text" placeholder="Vorname" name="firstName" onChange={handleChange} value={prescription.firstName}/>
                        </label>

                        <label className={styles.customField}>
                            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                            <input type="text" placeholder="Nachname" name="lastName" onChange={handleChange} required={true}/>
                        </label>
                    </div>

                    <div className={styles.twoInputs}>
                        <label className={styles.customField}>
                            {errors.zsrCode && <span className={styles.error}>{errors.zsrCode}</span>}
                            <input type="number" placeholder="ZSR-Nr." name="zsrCode" onChange={handleChange} required={true}/>
                        </label>

                        <label className={styles.customField}>
                            {errors.hinEmailAddress && <span className={styles.error}>{errors.hinEmailAddress}</span>}
                            <input type="text" placeholder="HIN-Emailadresse" name="hinEmailAddress" onChange={handleChange} value={prescription.hinEmailAddress}/>
                        </label>
                    </div>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <h2>Angaben Patient/Patientin</h2>
                    <div className={styles.twoInputs}>
                        <label className={styles.customField}>
                            {errors.patientFirstName && <span className={styles.error}>{errors.patientFirstName}</span>}
                            <input type="text" placeholder="Vorname" name="patientFirstName" onChange={handleChange} required={true}/>
                        </label>

                        <label className={styles.customField}>
                            {errors.patientLastName && <span className={styles.error}>{errors.patientLastName}</span>}
                            <input type="text" placeholder="Nachname" name="patientLastName" onChange={handleChange} required={true}/>
                        </label>
                    </div>
                    <label className={styles.customField}>
                        <span>Geburtsdatum:</span>{errors.birthdate && <span className={styles.error}>{errors.birthdate}</span>}
                        <input type="date" name="birthdate" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        {errors.AHV && <span className={styles.error}>{errors.AHV}</span>}
                        <input type="text" placeholder="AHV-Nummer" name="AHV" onChange={handleChange} required={true}/>
                    </label>

                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <h2>Angaben Rezept</h2>

                    <div className={styles.twoInputs}>
                        <label className={styles.customField}>
                            <span>Datum der Ausstellung:</span>{errors.prescriptionDate && <span className={styles.error}>{errors.prescriptionDate}</span>}
                            <input type="date" name="prescriptionDate" onChange={handleChange} required={true}/>
                        </label>

                        <label className={styles.customField}>
                            <span>Ablaufdatum des Rezeptes:</span>{errors.expirationDate && <span className={styles.error}>{errors.expirationDate}</span>}
                            <input type="date" name="expirationDate" onChange={handleChange} required={true}/>
                        </label>
                    </div>

                    <label className={styles.customField}>
                        {errors.numberOfUses && <span className={styles.error}>{errors.numberOfUses}</span>}
                        <input type="number" placeholder="Mehrfachrezept" name="numberOfUses" onChange={handleChange}/>
                    </label>
                </fieldset>

                {serviceList.map((singleService, index) => (
                    <fieldset key={index} className={styles.inputGroup}>
                        <label className={styles.customField}>
                            {errors.drugPrescriptions && <span className={styles.error}>{errors.drugPrescriptions[index]}</span>}
                            <input name="atcCode" placeholder="ATC-Nummer" type="text" id="service" value={singleService.service}
                                   onChange={(e) => handleServiceChange(e, index)} required />
                        </label>
                        <div className={styles.schedules}>
                            <label className={styles.scheduleCheckbox}>
                                <span>Morgens:</span>
                                <input type="checkbox" name="morning" onChange={e => handleScheduleChange(e, index)}/>
                            </label>
                            <label className={styles.scheduleCheckbox}>
                                <span>Mittags:</span>
                                <input type="checkbox" name="noon" onChange={e => handleScheduleChange(e, index)}/>
                            </label>
                            <label className={styles.scheduleCheckbox}>
                                <span>Abends:</span>
                                <input type="checkbox" name="evening" onChange={e => handleScheduleChange(e, index)}/>
                            </label>
                            <label className={styles.scheduleCheckbox}>
                                <span>Nachts:</span>
                                <input type="checkbox" name="night" onChange={e => handleScheduleChange(e, index)}/>
                            </label>
                            <label className={styles.scheduleInput}>
                                <span>Anderes:</span>
                                <input type="text" name="other" onChange={e => handleScheduleChange(e, index)}/>
                            </label>
                        </div>

                    </fieldset>))}

                <div>
                    <input type={"button"} value={"Medikament Hinzufügen"} className={styles.drugButton} onClick={handleServiceAdd}/>
                    <input type={"button"} value={"Medikament Entfernen"} className={styles.drugButton} onClick={handleServiceRemove}/>
                </div>

                <button disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Loading..." : "Submit"}
                </button>

            </form>
        </>
    )
}