import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FlowerVase } from '../components/Products'

 class FlowerVasePage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
         <FlowerVase/>

      </div>
    )
  }
}

export default FlowerVasePage
