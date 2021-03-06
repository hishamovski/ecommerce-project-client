import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import Layout from './Layout'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
// import StripeCheckout from 'react-stripe-checkout'
// import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: [],
      submitted: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/carts`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ cart: res.data.carts })
      })
      .catch(console.error)
  }
  deletefromCart = (id) => {
    axios({
      url: `${apiUrl}/carts/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        axios({
          url: `${apiUrl}/carts`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${this.props.user.token}`
          }
        })
          .then(res => {
            this.setState({ cart: res.data.carts })
          })
          .catch(console.error)
      }
      )
      .catch(console.error)
  }

  deleteCart = () => {
    axios({
      url: `${apiUrl}/cart`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ cart: [], submitted: true })
      }
      )
      .catch(console.error)
  }

  render () {
    const pStyle = {
      margin: '30px',
      fontSize: '20px'
    }

    const confirm = {
      margin: '40px',
      color: 'green',
      fontSize: '20px'
    }
    const { cart, submitted } = this.state
    // const productToBuy = {
    //   name: 'Tesla Roadster',
    //   price: 64998.67,
    //   description: 'Cool car'
    // }

    const productsList = cart.map(productInCart => (

      <Container key={productInCart._id}>
        <div className="row my-1 text-capitalize text-center">
          <div className="col-10 mx-auto col-lg-2">
            <Image
              src={productInCart.product.url}
              style={{ width: '25rem', heigth: '25rem' }}
              className="img-fluid"
              alt=""
            />
          </div>

          <div className="col-10 mx-auto col-lg-2 ">
            <span className="d-lg-none">product :</span> {productInCart.product.title}
          </div>

          <div className="col-10 mx-auto col-lg-2 ">
            <strong>
              <span className="d-lg-none">price :</span> ${productInCart.product.price}
            </strong>
          </div>
        </div>
        <Button onClick={() => { this.deletefromCart(productInCart._id) }} className="mr-3" size="md" variant="danger">Delete</Button>
      </Container>

    ))
    // async function handleToken (token, addresses) {
    //   const response = await axios.post(
    //     'https://2soen.sse.codesandbox.io/checkout',
    //     { token, productToBuy }
    //   )
    //   const { status } = response.data
    //   console.log('Response:', response.data)
    //   if (status === 'success') {
    //     toast('Success! Check email for details', { type: 'success' })
    //   } else {
    //     toast('Something went wrong', { type: 'error' })
    //   }
    // }

    if (cart.length === 0 && submitted) {
      return (
        <div>
          <p>Your cart is empty</p>
          <p style={confirm}>Thank you for your purchase. Your order will be shipped soon</p>
        </div>
      )
    }
    if (cart.length === 0) {
      return <p style={pStyle}> Your cart is empty</p>
    }

    let total = 0
    for (let i = 0; i < this.state.cart.length; i++) {
      total += this.state.cart[i].product.price
    }

    return (
      <React.Fragment>
        <ListGroup>
          {productsList}
        </ListGroup>
        <p style={pStyle}><strong> Your Total is : { total }</strong></p>
        <Button className='info' onClick={this.deleteCart}>Submit Order</Button>
      </React.Fragment>
      // <StripeCheckout
      //   stripeKey='pk_test_tYXOXZbOrhhZzDDSifz32Pbn001v5qn6LG'
      //   token={handleToken}
      //   amount={total * 100}
      //   name={productToBuy.name}
      //   billingAddress
      //   shippingAddress
      // />
    )
  }
}

export default Cart
