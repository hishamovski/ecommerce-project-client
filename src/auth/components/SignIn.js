import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user, true))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit">Sign In</Button>
      </Form>
    )
  }
}

export default withRouter(SignIn)
