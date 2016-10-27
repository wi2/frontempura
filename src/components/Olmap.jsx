import React, { Component } from 'react'


class Olmap extends Component{
  componentDidMount(){
    const { map } = this.props
    map.setTarget('map')
  }

  render () {
    return (
      <div id="map" className="map"></div>
    )
  }
}


export default Olmap
