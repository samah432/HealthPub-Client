import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getAppointments, updateAppointments, getAppointmentById } from '../../managers/AppointmentManager.js'
import { getSymptoms } from "../../managers/SymptomManager.js"
import './UpdateForm.css';



export const UpdateForm = () => {
    const navigate = useNavigate()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentAppointment, UpdatedAppointment] = useState({
        id: null,
        customer: 0,
        employee: 0,
        description: "",
        symptom_type: 1,
        date: ""
    })


    const params = useParams()
    const [symptomTypes, setSymptomTypes] = useState([])


    useEffect(() => {
        getSymptoms().then(data => setSymptomTypes(data))
    }, [])

    useEffect(() => {
        if (params.appointmentId) {
        getAppointmentById(params.appointmentId).then(data => UpdatedAppointment(data))

        }
    }, [params.appointmentId])


    




    const updateAppointmentState = (domEvent) => {
        UpdatedAppointment((prevState) => ({...prevState, [domEvent.target.name]: domEvent.target.value}))
    }
    console.log(currentAppointment)
    if (!params.appointmentId) {
        return null
    }
    return (
        <form className="AppointmentForm">
            <h2 className="AppointmentTitle">Update Appointment</h2>
            <fieldset>
                <div className="formCategories">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentAppointment.date}
                        onChange={updateAppointmentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="formCategories">
                    <label htmlFor="description"> Description </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentAppointment.description}
                        onChange={updateAppointmentState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="formCategories">
                    <label htmlFor="category" className="label-bold form-control">
                        Symptom Type:
                    </label>
                    <select
                        value={symptomTypes?.id}
                        onChange={updateAppointmentState}
                        className="form-control select"
                    >
                        <option value="0">Select Your Symptom</option>
                        {symptomTypes.map((symptom) => (
                            <option
                                key={`categoryType--${symptom.id}`}
                                value={symptom.id}
                            >
                                {symptom.type}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    console.log(currentAppointment, "currentAppointment")
                    const event = {
                        id: currentAppointment.id,
                        customer: parseInt(currentAppointment.customer),
                        employee: parseInt(currentAppointment.employee),
                        description: currentAppointment.description,
                        symptom_type: currentAppointment.symptom_type,
                        date: currentAppointment.date
                        
                    }

                    // Send POST request to your API
                    updateAppointments(event)
                        .then(() => navigate("/appointments"))
                }}
                className="UpdateButton">Update</button>
        </form>
    )
}