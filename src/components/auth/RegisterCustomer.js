import React, { useEffect, useRef, useState } from "react"
import { registerUser } from "../../managers/AuthManager"
import "./Auth.css"
import "./Login.css"

export const CustomerRegister = (props) => {
    const [customer, setCustomer] = useState({ "account_type": "customer" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()


    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={(evt) => {
                evt.preventDefault()
                registerUser(customer)
                }}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the team</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="first_name" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="last_name" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input onChange={updateCustomer}
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateCustomer}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address</label>
                    <input onChange={updateCustomer}
                        type="text" id="address" className="form-control"
                        placeholder="Enter your address" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="gender"> Gender</label>
                    <input onChange={updateCustomer}
                        type="text" id="gender" className="form-control"
                        placeholder="Gender" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="DOB"> DOB</label>
                    <input onChange={updateCustomer}
                        type="text" id="DOB" className="form-control"
                        placeholder="Enter Date of Birth" required autoFocus />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

