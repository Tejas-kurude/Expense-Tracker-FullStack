import axios from 'axios'
import React, { useState } from 'react'

const Profile = () => {

    const [data, setdata] = useState({})

    const token = localStorage.getItem("token")

    const response = async () => {

        const res = await axios.get(
            "http://127.0.0.1:8000/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
       await console.log(res.data)
        setdata(res.data)
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Profile
                    </h1>

                    <button
                        onClick={response}
                        className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-lg text-white font-semibold transition"
                    >
                        Load Profile
                    </button>

                </div>

                <div className="space-y-5">

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">
                            First Name
                        </p>

                        <h2 className="text-white text-xl font-semibold">
                            {data.F_Name}
                        </h2>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">
                            Last Name
                        </p>

                        <h2 className="text-white text-xl font-semibold">
                            {data.L_Name}
                        </h2>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">
                            Email
                        </p>

                        <h2 className="text-white text-xl font-semibold break-all">
                            {data.Email}
                        </h2>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-sm">
                            Account Status
                        </p>

                        <h2 className="text-emerald-400 text-xl font-semibold">
                            Active
                        </h2>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Profile