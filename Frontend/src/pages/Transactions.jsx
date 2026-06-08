import axios from 'axios'
import React, { useState } from 'react'

const Transactions = () => {

  const [data,setdata]  = useState([])
  const [date,setdate] = useState("")
  const [Spend,setSpend] = useState("")
  const [For,setFor] = useState("")


  token = localStorage.getItem("token")

  const response= async ()=>{
    const res = await axios.get('http://localhost:8000/showtransactions',{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    setdata(res.data)

  }


  const addtran = ()=>{
    const a = await axios.post("http://localhost:8000/transactions",
      {

      }
    )
  }




  return (
    <div>
      <button>Add Transaction</button>
    </div>
  )
}

export default Transactions
