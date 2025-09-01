import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogPage from '../components/BlogPage'

class BlogPageHome extends Component {
  render() {
    return (
      <div>
        <Navbar/>
          <BlogPage/>

     
      </div>
    )
  }
}

export default BlogPageHome
