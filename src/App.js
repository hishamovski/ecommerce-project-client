import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Products from './products/Products'
import Product from './products/Product'
import ProductCreate from './products/ProductCreate'
import ProductEdit from './products/ProductEdit'
import Cart from './products/Cart'
import Home from './products/Home'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state
    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <AuthenticatedRoute user={user} exact path='/create-product' render={() => <ProductCreate user={user}/>} />
          <AuthenticatedRoute user={user} exact path='/products/:id/edit' render={() => <ProductEdit user={user}/>} />
          <AuthenticatedRoute user={user} exact path='/cart' render={() => <Cart user={user}/>} />
          <AuthenticatedRoute user={user} exact path='/products' render={() => <Products user={user}/>} />

          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Home alert={this.alert} user={user} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/products/:id' render={() => (
            <Product alert={this.alert} setUser={this.setUser} user={user}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
