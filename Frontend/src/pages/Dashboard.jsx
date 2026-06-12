import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {

  const token = localStorage.getItem("token")

  const [ask, setask] = useState("")
  const [mess, setmess] = useState([])
  const [load, setload] = useState(false)


  const response = async () => {

    const question = ask

    if (!question.trim()) return
    setload(true)

    try{

      const res = await axios.post(
        "http://127.0.0.1:8000/assistant",
        {},
        {
          params: {
            ask: question
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      setmess(prev => [
        ...prev,
        {
          question,
          answer: res.data
        }
      ])
    }
    finally{
      setload(false)
    }
    }

  return (
    <>
      <Navbar />



      <div className="min-h-130 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white pb-32">

        <div className="max-w-5xl mx-auto p-6">

          <h1 className="text-4xl font-bold text-center mb-8">
            AI Financial Assistant
          </h1>

          <div className="flex flex-col gap-6">

            {mess.map((elem, idx) => (

              <div key={idx}>

                {/* User Message */}

                <div className="flex justify-end mb-2">

                  <div
                    className="
                  max-w-[70%]
                  rounded-2xl
                  rounded-br-md
                  bg-cyan-600
                  px-4
                  py-3
                  shadow-lg
                  hover:scale-[1.01]
                  transition-all
                  duration-200
                "
                  >
                    <p className="text-xs opacity-80 mb-1">
                      You
                    </p>
                    <p
                      className="whitespace-pre-wrap text-slate-100 leading-8 text-basefont-medium tracking-wide
  "
                    >
                      {elem.question}
                    </p>
                  </div>

                </div>

                {/* AI Message */}

                <div className="flex justify-start">

                  <div
                    className="
                  max-w-[75%]
                  rounded-2xl
                  rounded-bl-md
                  bg-slate-800
                  border
                  border-slate-700
                  px-4
                  py-3
                  shadow-lg
                  hover:border-cyan-500
                  transition-all
                  duration-200
                "
                  >
                    <p className="text-xs text-cyan-400 mb-1">
                      Financial AI
                    </p>

                    <p
                      className="
                           whitespace-pre-wrap
                           text-slate-100
                            leading-8
                            text-base
                            font-medium
                            tracking-wide
  "
                    >
                      {elem.answer}
                    </p>

                  </div>

                </div>

              </div>

            ))}

            {load && (

              <div className="flex justify-start mt-4">

                <div
                  className="
      bg-slate-800
      border
      border-slate-700
      rounded-2xl
      rounded-bl-md
      px-4
      py-3
      shadow-lg
      "
                >

                  <p className="text-cyan-400 text-xs mb-2">
                    Financial AI
                  </p>

                  <div className="flex items-center gap-3">

                    <div
                      className="
          h-4
          w-4
          rounded-full
          border-2
          border-cyan-400
          border-t-transparent
          animate-spin
          "
                    />

                    <p className="animate-pulse text-slate-300">
                      Analyzing your transactions...
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* Floating Input */}

        <div className="fixed bottom-0 left-0 w-full border-t border-slate-800 bg-slate-950/95 backdrop-blur-md p-4">

          <div className="max-w-5xl mx-auto flex gap-3">

            <input
              type="text"
              placeholder="Ask about your expenses..."
              value={ask}
              onChange={(e) => {
                setask(e.target.value)
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await response()
                  setask("")
                }
              }}
              className="
              flex-1
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              outline-none
              transition-all
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/30
            "
            />

            <button
              type="button"
              onClick={async () => {
                await response()
                setask("")
              }}
              className="
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              px-6
              py-3
              font-semibold
              shadow-lg
              transition-all
              duration-150
              hover:scale-105
              hover:shadow-cyan-500/30
              active:scale-95
              active:translate-y-1
            "
            >
              Ask AI
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default Dashboard