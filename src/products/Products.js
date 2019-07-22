import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Layout from './Layout'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      error: null,
      products: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products`)
      .then(res => this.setState({ products: res.data.products, loaded: true }))
      .catch(err => this.setState({ error: err.stack }))
  }
  render () {
    const { products, error, loaded } = this.state
    const productsList = products.map(product => (
      <ListGroup.Item key={product._id} action as={Link} to={`/products/${product._id}`}>
        {product.title}
      </ListGroup.Item >
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
      <Layout md="8" lg="6">
        <h4>products</h4>
        <ListGroup>
          {productsList}
        </ListGroup>
      </Layout>
    )
  }
}

export default Products
