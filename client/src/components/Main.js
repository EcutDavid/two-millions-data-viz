import React from 'react'

import Header from './Header'
import Chart from './Chart'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'
import 'styles/main.scss'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Chart />
      </div>
    )
  }
}
