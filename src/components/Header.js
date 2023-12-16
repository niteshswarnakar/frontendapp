import React from 'react'
import {Link, useNavigate} from "react-router-dom"
const Header = () => {
    let navigate = useNavigate()
  return (
    <div>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/survey">Survey Result</Link>
        <br/>
        <Link to="/survey/form">Take Survey</Link>
        <br/>
        <Link to="/signup">Sign Up</Link>
        <br/>
        <Link to="/signin">Sign In</Link>
        <br/>
        <button onClick={()=>{
            localStorage.clear("token")
            navigate("/signin")
        }}>Logout</button>
    </div>
    )
}

export default Header