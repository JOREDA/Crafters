import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Login } from '../components/Login'

class LoginPage extends Component {
  render() {
    return (
      <div>
        {/* <Navbar/> */}
        <Login/>
      </div>
    )
  }
}

export default LoginPage
