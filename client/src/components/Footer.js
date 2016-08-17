import React from 'react'
import { connect } from 'react-redux'

import 'styles/footer.scss'

@connect(mapStateToProps)
export default class Header extends React.Component {
  render() {
    const { location } = this.props

    return (
      <div className='Footer'>
        {
          (location !== '') && (
            <h5 className='description'>Server name: {location}</h5>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const location = state.status.get('location')

  return { location }
}
