const URL = "http://localhost:8080"

export async function getPrescriptionById(id) {
    const response = await fetch(`${URL}/prescription/id/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()

    console.log(data)
    return data
}

export async function usePrescription(id) {
    const response = await fetch(`${URL}/prescription/use/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }
}