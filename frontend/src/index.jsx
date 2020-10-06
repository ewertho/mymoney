import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './main/routes'
import {applyMiddleware ,createStore} from 'redux'
import {Provider} from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import reducers from './main/reducers'

/**configurando o codigo para o dev tool do redux 
 * programa para navegadores que controla o fluxo do redux
*/
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()

/** Promise (react-redux)
 * middleware para esperar a promise da consulta ao backend
 * sera aplicado a todas as consultas feitas
 */
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>
, document.getElementById('app'))