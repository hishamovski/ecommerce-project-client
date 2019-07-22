import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ProductForm = ({ product, handleSubmit, handleChange, cancelPath }) => (

  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Product</Form.Label>
      <Form.Control
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
        value={product.title}
      />
    </Form.Group>
    <Form.Group controlId="details">
      <Form.Label>Product Details</Form.Label>
      <Form.Control
        type="text"
        placeholder="Details"
        name="details"
        onChange={handleChange}
        value={product.details}
      />
    </Form.Group>
    <Form.Group controlId="price">
      <Form.Label>Product Price</Form.Label>
      <Form.Control
        type="Number"
        placeholder="Product Price"
        name="price"
        onChange={handleChange}
        value={product.price}
      />
    </Form.Group>
    <Form.Group controlId="url">
      <Form.Label>Picture Url</Form.Label>
      <Form.Control
        type="file"
        placeholder="url"
        name="url"
        onChange={handleChange}
        value={product.url}
      />
    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
    <Link to={cancelPath}><Button>cancel</Button></Link>
  </Form>
)

export default ProductForm
