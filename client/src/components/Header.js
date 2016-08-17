import React from 'react'

import 'styles/header.scss'

export default class App extends React.Component {
  render() {
    return (
      <div className='Header'>
        <h1 className='title'>A simple case study</h1>
        <h5 className='sub-title'>Handle big data set for data viz</h5>
      </div>
    )
  }
}
