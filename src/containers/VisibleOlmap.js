import { Component } from 'react'
import { connect } from 'react-redux'
import Olmap from '../components/Olmap'

const mapStateToProps = state => ({
  map : state.map
})

export default connect(mapStateToProps)(Olmap)
