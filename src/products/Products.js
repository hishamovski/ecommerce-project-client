import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Layout from './Layout'
import { Link } from 'react-router-dom'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      error: null,
      products: [],
      cart: [],
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/products`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ products: res.data.products, loaded: true })
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
      })
      .catch(err => this.setState({ error: err.stack }))
  }

  addToCart = (product) => {
    axios({
      url: `${apiUrl}/carts`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        cart: {
          product: product
        }
      }
    })
      .then(res => {
        this.setState({
          cart: [...this.state.cart, res.data.product]
        })
      })
      .catch(console.error)
  }

  isIncluding = (id) => {
    if (this.state.cart.length > 0) {
      for (let i = 0; i < this.state.cart.length; i++) {
        if (this.state.cart[i].product._id === id) {
          return true
        }
      }
    }
    return false
  }

  render () {
    const { products, error, loaded } = this.state
    const productsList = products.map(product => (
      <div key={product._id}>
        <ListGroup.Item action as={Link} to={`/products/${product._id}`}>
          <div className='title'>
            <strong>
              {product.title}
            </strong>
          </div>
          <div>
            {product.details}
          </div>
          <div className="image-container">
            <Image src={product.url}/>
          </div>
          <div>
            <strong>
              $  {product.price}
            </strong>
          </div>
        </ListGroup.Item>
        {this.isIncluding(product._id) ? <Button
          className='info'>product is in the cart</Button>
          : <Button
            onClick={() => this.addToCart(product)}
            className='info'>Add to cart</Button>}
      </div>
    ))

    if (!loaded) {
      return <p> Loading ...</p>
    }
    if (products.length === 0) {
      return <p>No products </p>
    }
    if (error) {
      return <p> Error: {error}</p>
    }
    return (
      <Layout>
        <h4>products</h4>
        <ListGroup>
          {productsList}
        </ListGroup>
      </Layout>
    )
  }
}

export default Products
