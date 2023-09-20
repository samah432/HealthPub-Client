import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const accountType = useRef()
    const password = useRef()
    const position = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const email = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "account_type": accountType.current.value,
                "password": password.current.value,
                "email": email.current.value,
                "position": position.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("lu_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                <label htmlFor="accountType">Account Type</label>
                <select ref={accountType} name="accountType" className="form-control">
                    <option value="employee">Employee</option>
                </select>
                </fieldset>

                <fieldset>
                <label htmlFor="position">Position</label>
                <select ref={position} name="position" className="form-control">
                    <option value="Dentist">Dentist</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Physician">Physician</option>
                </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="email"> email </label>
                    <textarea ref={email} name="email" className="form-control" placeholder="Enter your email" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
