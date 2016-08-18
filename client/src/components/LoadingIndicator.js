import React from 'react'

import 'styles/loadingIndicator.scss'

export default class LoadingIndicator extends React.Component {
  render() {
    const { location } = this.props

    return (
      <div className='LoadingIndicator'>
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div>
    )
  }
}
