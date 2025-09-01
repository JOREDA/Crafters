import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Essential from '../components/Products/Essential'

class EssentialPage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Essential/>
      </div>
    )
  }
}

export default EssentialPage
