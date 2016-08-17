import React from 'react'

import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'
import 'styles/app.scss'

class AppComponent extends React.Component {
  render() {
    return (
      <div className='index'>
        <button className='button'>Hello splunk</button>
      </div>
    )
  }
}

export default AppComponent
