import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      deleted: false,
      products: [],
      cart: [],
      uploaded: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ product: res.data.product, loaded: true })
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

  deleteMovie = () => {
    axios({
      url: `${apiUrl}/products/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ deleted: true })
      })
      .catch(err => this.setState({ error: err.message }))
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
    const { product, error, deleted } = this.state
    const { user } = this.props
    if (error) {
      return <p> ERROR: NOT FOUND</p>
    }
    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Movie Successfully deleted' } }
      }/>
    }
    if (!product) {
      return <p>Loading...</p>
    }
    const ownerButtons = (
      <div>
        <Button onClick={this.deleteMovie} className="mr-3" size="md" variant="danger">Delete</Button>
        <Button className="mr-3" size="md" variant="secondary" href={`#products/${this.props.match.params.id}/edit`}>Edit</Button>
      </div>
    )
    return (
      <Layout>
        <div key={product._id}>
          <ListGroup.Item>
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
            className='info'>Added To Cart</Button>
            : <Button
              onClick={() => this.addToCart(product)}
              className='info'>Add to cart</Button>}
        </div>
        <Link to="/products">Back to all products</Link>
        {user && user._id === product.owner ? ownerButtons : ''}
      </Layout>
    )
  }
}

export default withRouter(Product)
