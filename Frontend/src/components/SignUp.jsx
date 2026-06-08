import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {

    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [Email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const response = async () => {
        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/signup",
                {
                    F_Name: Fname,
                    L_Name: Lname,
                    Email: Email,
                    Pass: pass
                }
            )

            toast.success("Account Created Successfully 🎉")
            return res

        } catch (err) {

            toast.error(
                err.response?.data?.detail || "Signup Failed"
            )

            console.log(err.response?.data)
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
                newestOnTop
            />

            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

                <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Start managing your expenses today
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            response()

                            setFname("")
                            setLname("")
                            setEmail("")
                            setPass("")
                        }}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            placeholder="First Name"
                            value={Fname}
                            onChange={(e) => {
                                setFname(e.target.value)
                            }}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={Lname}
                            onChange={(e) => {
                                setLname(e.target.value)
                            }}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={Email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => {
                                setPass(e.target.value)
                            }}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Create Account
                        </button>

                    </form>

                </div>

            </div>
        </>
    )
}

export default SignUp