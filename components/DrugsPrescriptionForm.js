import styles from "./DrugsPrescriptionForm.module.css"

export default function DrugsPrescriptionForm() {

    const handleChange = async (e) => {}

    return (
        <>
            <fieldset htmlFor="" className={styles.inputGroup}>

                <label className={styles.customField}>
                    <span>DrugName</span>
                    <input type="text" name="drugName" onChange={handleChange} required={true}/>
                </label>

                <label classcName={styles.customField}>
                    <span>Schedule</span>
                    <span>Morning</span>
                    <input type="checkbox" name="morning" onChange={handleChange}/>
                    <span>Noon</span>
                    <input type="checkbox" name="noon" onChange={handleChange}/>
                    <span>Evening</span>
                    <input type="checkbox" name="evening" onChange={handleChange}/>
                    <span>Night</span>
                    <input type="checkbox" name="night" onChange={handleChange}/>
                    <span>Other</span>
                    <input type="text" name="other" onChange={handleChange}/>
                </label>

            </fieldset>
        </>
    )
}