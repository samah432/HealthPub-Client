export const getAppointments = () => {
    return fetch("http://localhost:8000/appointments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createAppointments = (event) => {
    return fetch("http://localhost:8000/appointments", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
}


export const deleteAppointment = async (pk) => {
    const res = await fetch(`http://localhost:8000/appointments/${pk}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      }
    });
};


export const getAppointmentById = (id) => {
    return fetch(`http://localhost:8000/appointments/${id}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }
    ).then(response => response.json())
}





export const updateAppointments = (appointment) => {
    console.log(appointment)
    return fetch(`http://localhost:8000/appointments/${appointment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(appointment)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to update profile");
        }
    });
}



