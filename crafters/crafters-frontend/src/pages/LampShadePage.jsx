import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LampShade from '../components/Products/LampShade'

class LampShadePage extends Component {
  render() {
    return (
      <div className="min-h-screen bg-[#f9f9f9]">
        <Navbar/>
        <div className="pt-20">
          <LampShade/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default LampShadePage
