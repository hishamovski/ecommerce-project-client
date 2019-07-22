import React, { Component } from 'react'
import ProductForm from './ProductForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'
import Layout from './Layout'

class ProductEdit extends Component {
  // step 1 : constructor and setState
  constructor (props) {
    super(props)

    this.state = {
      product: {
        title: '',
        details: '',
        price: '',
        url: ''
      },
      edited: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data.product }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedProduct = Object.assign(this.state.product, updatedField)
    this.setState({ product: editedProduct })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/products/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { product: this.state.product }
    })
      .then(this.setState({ edited: true }))
      .catch(console.Log)
  }
  // step 2: render function to display jsx
  render () {
    const { handleChange, handleSubmit } = this
    const { product, edited } = this.state

    if (edited) {
      return <Redirect to={
        {
          pathname: `/products/${this.props.match.params.id}`,
          state: {
            msg: 'updated Successfully'
          }
        }
      } />
    }
    return (
      <Layout>
        <h3>Edit Your Product:</h3>
        <ProductForm
          product={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/products/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default withRouter(ProductEdit)
