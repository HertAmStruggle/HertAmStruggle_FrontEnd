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
                    Rezept #{prescription.id}
                </h1>
                <h2>
                    Mehrfach brauchbar: {prescription.numberOfUses}
                </h2>
                <div className={styles.personInfo}>
                    <div class={styles.doctorInfo}>
                        <h2>
                            Ausgestellt von: {prescription.doctor.firstName} {prescription.doctor.lastName}
                        </h2>
                        <p>
                            ZSR-Nr.: {prescription.doctor.zsrCode} <br/>
                            HIN-Emailadresse: {prescription.doctor.hinEmailAddress} <br/>
                            Addresse: {prescription.doctor.address}
                        </p>
                    </div>
                    <div className={styles.patientInfo}>
                        <h2>
                            Für Patient/Patientin: {prescription.patient.firstName} {prescription.patient.lastName}
                        </h2>
                        <p>
                            Geburtsdatum: {prescription.patient.birthDate} <br/>
                            AHV-Nr.: {prescription.patient.AHV}
                        </p>
                    </div>
                </div>
                <div className={styles.drugs}>
                    <h2>
                        Medikamente
                    </h2>
                    <div className={styles.drugPrescriptions}>
                        {prescription && <>
                            {
                                prescription.drugs.map(drug => {
                                    return (
                                        <div key={drug.drug.id} className={styles.drugPrescription}>
                                            <h3>
                                                {drug.drug.name}
                                            </h3>
                                            <p>
                                                Zulassungsnummer: {drug.drug.approvalNumber} <br/>
                                                Hersteller: {drug.drug.permitHolder} <br/>
                                                ATC-Nr.: {drug.drug.ATCCode} <br/>
                                                Kategorie: {drug.drug.Category} <br/>
                                                Zusätzliche Informationen: {drug.prescriptionText}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </>}
                    </div>
                </div>
                <button type={"button"} onClick={handleUse} className={styles.useButton}>
                    Entwerten!
                </button>
            </div>
        </>
    )
}