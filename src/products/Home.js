import React from 'react'
import Title from './Title'

const Layout = props => {
  const { user } = props
  if (!user) {
    return (
      <Title name='Sign-In To Check' title='Our Products'/>
    )
  } else {
    return (<p/>)
  }
}

export default Layout
