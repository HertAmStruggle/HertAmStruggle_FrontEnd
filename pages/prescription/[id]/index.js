import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getPrescriptionById, usePrescription} from "../../../lib/api";
import styles from "./index.module.css"

export default function CardPage() {
    const router = useRouter()
    const {id} = router.query

    const [prescription, setPrescription] = useState()

    useEffect(() => {
        if (!id) return
        const loadPrescription = async () => {
            try {
                const card = await getPrescriptionById(id)
                setPrescription(card)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadPrescription()
    }, [id, router])

    const handleUse = (() => {
        usePrescription(prescription.id)
    })

    return !prescription ? null : (
        <>
            <div className={styles.PrescriptionInfo}>
            <h1>
                Prescription {prescription.id}
            </h1>
            <h2>
                Usable {prescription.numberOfUses} times
            </h2>

            <h2>
                Issued
                by {prescription.doctor.firstName} {prescription.doctor.lastName}
            </h2>
            <p>
                ZSR : {prescription.doctor.zsrCode} <br/>
                HIN : {prescription.doctor.hinEmailAddress} <br/>
                Address : {prescription.doctor.address}
            </p>
            <h2>
                For {prescription.patient.firstName} {prescription.patient.lastName}
            </h2>
            <p>
                Birthdate : {prescription.patient.birthDate} <br/>
                AHV : {prescription.patient.AHV}
            </p>
            <h2>
                For the following drugs
            </h2>
            <div>
                {prescription && <>
                    {
                        prescription.drugs.map(drug => {
                            return (
                                <div key={drug.drug.id}>
                                    <h2>
                                        {drug.drug.name}
                                    </h2>
                                    <p>
                                        Approval Number : {drug.drug.approvalNumber} <br/>
                                        Permit Holder : {drug.drug.permitHolder} <br/>
                                        ATC : {drug.drug.ATCCode} <br/>
                                        Category : {drug.drug.Category} <br/>
                                        Additional Info: {drug.prescriptionText}
                                    </p>
                                </div>
                            )
                        })
                    }
                </>}
            </div>
            <button type={"button"} onClick={handleUse}>
                Use The Prescription
            </button>
            </div>
        </>
    )
}