import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Image from 'react-bootstrap/Image'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Title from './Title'

class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cart: [],
      updated: ''
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
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { cart, updated } = this.state
    const productToBuy = {
      name: 'Tesla Roadster',
      price: 64998.67,
      description: 'Cool car'
    }
    if (updated) {
      this.componentDidMount()
    }

    const productsList = cart.map(productInCart => (

      <Container key={productInCart._id}>
        <div className="row my-1 text-capitalize text-center">
          <div className="col-10 mx-auto col-lg-2">
            <Image
              src={productInCart.product.url}
              style={{ width: '14rem', heigth: '14rem' }}
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

      // <Col xs={6} md={4}>
      // <Image src={productInCart.product.url} fluid/>
      // </Col>
      // <Col xs={6} md={4}>
      // {productInCart.product.title}
      // </Col>
      // <Col xs={6} md={4}>
      // {productInCart.product.price}
      // </Col>
      // <React.Fragment key={productInCart._id}>
      //   <ListGroup.Item>
      //     <Image src={productInCart.product.url} roundedCircle/> {productInCart.product.price}
      //   </ListGroup.Item>
      //   <Button onClick={() => { this.deletefromCart(productInCart._id) }} className="mr-3" size="md" variant="danger">Delete</Button>
      // </React.Fragment>
    ))
    async function handleToken (token, addresses) {
      console.log(token)
      const response = await axios.post(
        'https://2soen.sse.codesandbox.io/checkout',
        { token, productToBuy }
      )
      const { status } = response.data
      console.log('Response:', response.data)
      if (status === 'success') {
        toast('Success! Check email for details', { type: 'success' })
      } else {
        toast('Something went wrong', { type: 'error' })
      }
    }

    if (cart.length === 0) {
      return <p>Your cart is empty</p>
    }
    return <Layout md="8" lg="6">
      <Title name="your" title="cart" />
      <ListGroup>
        {productsList}
      </ListGroup>
      <StripeCheckout
        stripeKey='pk_test_tYXOXZbOrhhZzDDSifz32Pbn001v5qn6LG'
        token={handleToken}
        amount={200}
        name={productToBuy.name}
        billingAddress
        shippingAddress
      />
    </Layout>
  }
}

export default Cart
