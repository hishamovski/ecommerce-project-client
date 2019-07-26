import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'

class Product extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      product: null
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ product: res.data.product })
      })
      .catch(console.error)
  }

  render () {
    console.log(this.state.product)
    const { product, error } = this.state
    const { user } = this.props
    if (error) {
      return <p> ERROR: NOT FOUND</p>
    }
    if (!product) {
      return <p>Loading...</p>
    }
    const ownerButtons = (
      <div>
        <Button className="mr-3" size="md" variant="danger">Delete</Button>
        <Button className="mr-3" size="md" variant="secondary" href={`#products/${this.props.match.params.id}/edit`}>Edit</Button>
      </div>
    )
    return (
      <Layout xs="12" sm="12" md="8" lg="6">
        <h3>Title: {product.title}</h3>
        <p> Details: {product.details}</p>
        <p>Price: {product.price}</p>
        <p>URL: {product.url}</p>
        <p>Owner: {product.owner}</p>
        <Link to="/">Back to all products</Link>
        {user && user._id === product.owner ? ownerButtons : ''}
      </Layout>
    )
  }
}

export default withRouter(Product)
