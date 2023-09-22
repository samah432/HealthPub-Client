import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createAppointments, getAppointments } from '../../managers/AppointmentManager.js'
import { getSymptoms } from "../../managers/SymptomManager.js"



export const AppointmentForm = () => {
    const navigate = useNavigate()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentAppointment, setCurrentAppointment] = useState({
        customer: 0,
        employee: 0,
        description: "",
        symptom_type: 1,
        date: ""
    })

    const [symptomTypes, setSymptomTypes] = useState([])


    useEffect(() => {
        getSymptoms().then(data => setSymptomTypes(data))
    }, [])



    




    const changeAppointmentState = (domEvent) => {
        const newAppointmentState = { ...currentAppointment }
        newAppointmentState[domEvent.target.name] = domEvent.target.value
        setCurrentAppointment(newAppointmentState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentAppointment.date}
                        onChange={changeAppointmentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Description </label>
                    <input type="text" name="description" required className="form-control"
                        value={currentAppointment.description}
                        onChange={changeAppointmentState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="label-bold subtitle">
                        Symptom Type:
                    </label>
                    <select
                        value={symptomTypes?.id}
                        onChange={changeAppointmentState}
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

                    const event = {
                        customer: parseInt(currentAppointment.customer),
                        employee: parseInt(currentAppointment.employee),
                        description: currentAppointment.description,
                        symptom_type: currentAppointment.symptom_type,
                        date: currentAppointment.date
                        
                    }

                    // Send POST request to your API
                    createAppointments(event)
                        .then(() => navigate("/appointments"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}