import styles from "./form.module.css";
import React, {useState} from "react";

const defaultModel = {
    "firstName": "",
    "lastName": "",
    "zsrCode": 0,
    "hinEmailAddress": "",
    "prescriptionDate": "",
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

    return {errors, isValid}
}

function isRegexValid(string, regex) {
    return string.match(regex)
}

function isInputValid(inputString, type, prompt) {
    if(type === "string") {
        errors.birthdate = "The birthdate can't be empty!"
    } else if (type === "number") {

    } else {

    }
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

    return (
        <>
            <form name="contactForm" onSubmit={handleSubmit}>
                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Vorname:</span>{errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                        <input type="text" name="firstName" onChange={handleChange} value={prescription.firstName}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Nachname:</span>{errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                        <input type="text" name="lastName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>ZSR-Nr.:</span>{errors.zsrCode && <span className={styles.error}>{errors.zsrCode}</span>}
                        <input type="number" name="zsrCode" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Datum der Ausstellung:</span>{errors.prescriptionDate && <span className={styles.error}>{errors.prescriptionDate}</span>}
                        <input type="date" name="prescriptionDate" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>HIN-Emailadresse:</span>{errors.hinEmailAddress && <span className={styles.error}>{errors.hinEmailAddress}</span>}
                        <input type="text" name="hinEmailAddress" onChange={handleChange} value={prescription.hinEmailAddress}/>
                    </label>
                </fieldset>

                <fieldset className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>Vorname des Patienten/der Patientin:</span>{errors.patientFirstName && <span className={styles.error}>{errors.patientFirstName}</span>}
                        <input type="text" name="patientFirstName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Nachname des Patienten/der Patientin:</span>{errors.patientLastName && <span className={styles.error}>{errors.patientLastName}</span>}
                        <input type="text" name="patientLastName" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Geburtsdatum:</span>{errors.birthdate && <span className={styles.error}>{errors.birthdate}</span>}
                        <input type="date" name="birthdate" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>AHV-Nr.:</span>{errors.AHV && <span className={styles.error}>{errors.AHV}</span>}
                        <input type="text" name="AHV" onChange={handleChange} required={true}/>
                    </label>

                    <label className={styles.customField}>
                        <span>Mehrfachrezept:</span>{errors.numberOfUses && <span className={styles.error}>{errors.numberOfUses}</span>}
                        <input type="number" name="numberOfUses" onChange={handleChange}/>
                    </label>
                </fieldset>

                {serviceList.map((singleService, index) => (
                <fieldset key={index} className={styles.inputGroup}>
                    <label className={styles.customField}>
                        <span>ATC-Nr.:</span>{errors.drugPrescriptions && <span className={styles.error}>{errors.drugPrescriptions[index]}</span>}
                        <input name="atcCode" type="text" id="service" value={singleService.service}
                            onChange={(e) => handleServiceChange(e, index)} required />
                    </label>
                    <div>
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

                <input type={"button"} value={"Add Form"} onClick={handleServiceAdd}/>
                <input type={"button"} value={"Remove Form"} onClick={handleServiceRemove}/>

                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>

            </form>
        </>
    )
}