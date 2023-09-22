import React, { useEffect, useState } from "react";
import { deleteAppointment, getAppointments, updateAppointments } from "../../managers/AppointmentManager.js";
import { useNavigate } from 'react-router-dom';
import "./AppointmentList.css"

export const AppointmentList = (props) => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments when the component mounts
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        getAppointments().then(data => setAppointments(data));
    };

    const handleDelete = (appointmentId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this appointment?");
        if (shouldDelete) {
            deleteAppointment(appointmentId)
                .then(() => {
                    // If the appointment is deleted successfully, fetch the updated list of appointments
                    fetchAppointments();
                })
                .catch(error => {
                    console.error("Error deleting appointment:", error);
                });
        }
    };




    return (
        <article className="appointments">
            <header>
                <button className="RegisterButton"
                    onClick={() => {
                        navigate({ pathname: "/appointments/new" })
                    }}
                >
                    Register New Appointment
                </button>
            </header>
            {
                appointments.map(appointment => {
                    return (
                        <section key={`appointment--${appointment.id}`} className="appointment">
                            <div className="appointment__title">Customer Number: {appointment.customer}</div>
                            <div className="appointment__title">Employee Number: {appointment.employee} </div>
                            <div className="appointment__title">Description: {appointment.description} </div>
                            <div className="appointment__title">Symptom Type: {appointment.symptom_type} </div>
                            <div className="appointment__title">Date: {appointment.date} </div>
                            <br></br>
                            <div>
                                <button className="deleteButton" onClick={() => handleDelete(appointment.id)}>
                                    Delete
                                </button>
                                <button onClick={() => {
                        navigate({ pathname: `/updateappointments/${appointment.id}` })
                            }}
                        >
                            Update
                                </button>

                            </div>
                        </section>
                    );
                })
            }
        </article>
    );
};
