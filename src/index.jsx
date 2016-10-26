import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import OlMap from './components/map'
import ol from 'openlayers'

import styles from './styles/main.sass'


let store = createStore(reducer, map)

render(
  <Provider store={store}>
    <OlMap/>
  </Provider>,
  document.getElementById("root")
)

function reducer(state = [], action){
  return state
}

let map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: [949282, 6002552],
    zoom: 4
  })
});

console.log(store.getState());
