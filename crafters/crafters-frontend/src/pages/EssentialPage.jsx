import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Essential } from '../components/Products'

class EssentialPage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Essential/>
        <Footer/>
      </div>
    )
  }
}

export default EssentialPage
