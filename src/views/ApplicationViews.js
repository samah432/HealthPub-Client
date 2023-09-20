import { Route, Routes } from "react-router-dom"
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
            <Route element={<Authorized />}>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
