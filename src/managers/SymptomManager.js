export const getSymptoms = () => {
    return fetch("http://localhost:8000/symptomtypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
