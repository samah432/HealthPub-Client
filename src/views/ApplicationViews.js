import { Route, Routes } from "react-router-dom"
import { AppointmentForm } from "../components/Appointments/AppointmentForm"
import { AppointmentList } from "../components/Appointments/AppointmentList"
import { UpdateForm } from "../components/Appointments/UpdateForm"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { CustomerRegister } from "../components/auth/RegisterCustomer"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customerregister" element={<CustomerRegister />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/new" element={<AppointmentForm />} />
            <Route path="/updateappointments/:appointmentId" element={<UpdateForm />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
