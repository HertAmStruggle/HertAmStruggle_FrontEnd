import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getPrescriptionById, usePrescription} from "../../../lib/api";

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
            <h1>
                Prescription {prescription.id}
            </h1>
            <h2>
                Usable {prescription.numberOfUses}
            </h2>

            <h2>
                Issued
                by {prescription.doctor.firstName} {prescription.doctor.lastName} ({prescription.doctor.zsrCode})({prescription.doctor.hinEmailAddress})
                ({prescription.doctor.address})
            </h2>
            <h2>
                For {prescription.patient.firstName} {prescription.patient.lastName} ({prescription.patient.birthDate})
                ({prescription.patient.AHV})
            </h2>
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
                                        {drug.drug.name} ({drug.drug.approvalNumber})({drug.drug.permitHolder})({drug.drug.ATCCode})({drug.drug.Category})
                                    </h2>
                                    <p>
                                        {drug.prescriptionText}
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
            <h2>
                {JSON.stringify(prescription, null, 4)}
            </h2>
        </>
    )
}