import React from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {render} from 'react-dom'
import ol from 'openlayers'

import App from './components/app'
import styles from './styles/main.sass'

let mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  target: document.getElementByTag('body'),
  undefinedHTML: 'Lon(x), Lat(y)'
});
let map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: [949282, 6002552],
    zoom: 4
  }),
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: false
    })
  }).extend([mousePositionControl])
});

let initialState = {
  map : map
}

let store = createStore(reducer, initialState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
)

//
function reducer(state = [], action){
  return state
}

console.log(store.getState());
