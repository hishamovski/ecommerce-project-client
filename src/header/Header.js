import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import './Header.scss'
import Image from 'react-bootstrap/Image'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#cart">cart</Nav.Link>
    <Nav.Link href="#products">Products</Nav.Link>
    <Nav.Link href="#create-product">Create A Product</Nav.Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
  </React.Fragment>
)

const Header = ({ user }) => {
  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand as={Link} to={'/'}><Image style={{ width: '6rem', heigth: '2rem' }} src="https://image.noelshack.com/fichiers/2019/30/3/1564004989-logo-chez-hicham-white.png"></Image></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto dark">
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
          { alwaysOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header

// import React from 'react'
// import { Link } from 'react-router-dom'
//
// import './Header.scss'
//
// const authenticatedOptions = (
//   <React.Fragment>
//     <Link to="/change-password">Change Password</Link>
//     <Link to="/sign-out">Sign Out</Link>
//     <Link to="/create-product">Add A New Product</Link>
//   </React.Fragment>
// )
//
// const unauthenticatedOptions = (
//   <React.Fragment>
//     <Link to="/sign-up">Sign Up</Link>
//     <Link to="/sign-in">Sign In</Link>
//   </React.Fragment>
// )
//
// const alwaysOptions = (
//   <React.Fragment>
//     <Link to="/">Home</Link>
//   </React.Fragment>
// )
//
// const Header = ({ user }) => (
//   <header className="main-header">
//     <h1>Uber, But For Taxis</h1>
//     <nav>
//       { user && <span>Welcome, {user.email}</span>}
//       { user ? authenticatedOptions : unauthenticatedOptions }
//       { alwaysOptions }
//     </nav>
//   </header>
// )
//
// export default Header
