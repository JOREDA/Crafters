import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Wishlist from '../components/Wishlist'

export class WishlistPage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Wishlist/>
      </div>
    )
  }
}

export default WishlistPage
