import React, { Component } from 'react'
import ProductForm from './ProductForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'
import Layout from './Layout'

class ProductCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {
        title: '',
        details: '',
        price: ''
      },
      createdProductId: null
    }
  }

  handleChange = event => {
    // create an object with updated field
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // use object to create updated state object
    const editedProduct = Object.assign(this.state.product, updatedField)
    // finally setState with updated object
    this.setState({ book: editedProduct })
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)

    // axios({
    //   url: `${apiUrl}/products`,
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Token token=${this.props.user.token}`
    //   },
    //   data: { product: this.state.product }
    // })
    //   .then(res => this.setState({ createdProductId: res.data.product._id }))
    //   .then()
    //   .catch(console.error)
    axios({
      method: 'POST',
      url: `${apiUrl}/uploads`,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: formData
    })
      .then(res => console.log(res.data.upload.url))
      .catch(console.error('failed inside the catch'))
  }
  render () {
    const { handleChange, handleSubmit } = this
    const { product, createdProductId } = this.state

    if (createdProductId) {
      return <Redirect to={`/products/${createdProductId}`} />
    }

    return (
      <Layout md="8" lg="6">
        <h4> Create a New Product</h4>
        <ProductForm
          product={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </Layout>
    )
  }
}

export default ProductCreate
