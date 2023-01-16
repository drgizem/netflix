import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import {Redirect,Link} from "react-router-dom"
import './Entrance.css'

export default function Entrance(){
  const [email,setEmail]=useState("")
  const [userData,setUserData]=useState([])
  const [error,setError]=useState({})
  const [emailControl,setEmailControl]=useState()

  
  useEffect(()=>{
    const fetchUsers=async ()=>{
      const res=await fetch('https://6319ce4a8e51a64d2becda22.mockapi.io/netflix-users',
      {
        method: 'GET'
      })
      const data=await res.json()
      setUserData(data)
    }
    fetchUsers()
  },[])
 
    const handleClick=()=>{
      const selectedUser=userData.find(item=>item.email===email)
      let newError={}
      if(!selectedUser){
        newError.email="Invalid Email!"
        setEmailControl(false)
      }else{
        setEmailControl(true)
      }
      setError(newError)
    }


  return (
    <div className="entrance_page">
      <div className="entrance_navbar">
      <img
        className="entrance__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <div className="entrance_option">
        <select name="language" className="entrance_select">
        <option key="English" className="entrance_option" value="English">English</option>
        <option key="Türkçe" className="entrance_option" value="Türkçe">Türkçe</option>
        </select>
        <button className="signin_button"><Link to="/signin" style={{textDecoration:"none", color:"white"}}>Sign up</Link></button>
      </div>
      </div>
      <div className='entrance_info'>
        <h1 className='entrance_h1'>Unlimited movies,TV<br></br>shows, and more.</h1>
        <h5 className='entrance_h5'>Watch anywhere. Cancel anytime.</h5>
        <p className='entrance_p'>Ready to watch? Enter your email to create or restart your membership.</p>
        <div className='entrance_input'>
        <TextField label="Email address" variant="filled"  id="email" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)} />
        <div className='start_btn'>
        <button variant="contained" className='entrance_start' onClick={handleClick}>Get started</button>
        <ArrowForwardIosIcon/>
        </div>
        </div>
        {error.email && <span className='invalid'>{error.email}</span>}
        {emailControl && <Redirect push to="/home" />}
      </div>
    </div>
  )
}