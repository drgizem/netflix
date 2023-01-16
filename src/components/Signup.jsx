import './Signup.css'
import {Link,Redirect} from "react-router-dom"
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Button from '@mui/material/Button'
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Signup(){
  const [user,setUser]=useState({
    email:"",
    password:"",
    phone:""
  })
  const [signup,setSignup]=useState(false)
  const url="https://6319ce4a8e51a64d2becda22.mockapi.io/netflix-users"
  
  const handleChange=(e)=>{
    const {name,value}=e.target
    setUser(preValue=>{
      return {...preValue,[name]:value}
    })
  }
  const handleClick=()=>{
    fetch(url,{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        email:user.email,
        phone:user.phone,
        password:user.password
      })
    }).then(response=>response.json())
    setSignup(true)
  }
  return (
    <div className="signin_page">
      <div><Link to="/"><img
        className="entrance__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      /></Link></div>
      <div className='signin_box'>
        <h1 className='signin_header'>Sign Up</h1>
        <form className='signin_form'>
        <TextField type="text" id='email' value={user.email || user.phone} name="email" label="Email or phone number" variant="filled" onChange={handleChange} />
        <TextField type="password" id='password' value={user.password} name="password" label="Password" variant="filled" onChange={handleChange}/>
        <Button color="error" id="signin_btn" variant="contained" onClick={handleClick}>Sign in</Button>
        {signup && <Redirect push to="/"/>}
        </form>
        <div className='signin_info'>
        <div className='remember'>
          <input type="checkbox" />
          <label>Remember me</label>
          </div>
          <div className='need'>Need help?</div>
          </div>
          <a href='https://www.facebook.com/'>
          <div className='facebook'>
            <FacebookIcon/>
            <p>Login with facebook</p>
          </div>
          </a>
      </div>
      </div>
  )
}