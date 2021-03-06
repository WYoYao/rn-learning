/**
 *
 * Created by weimeng on 16/2/18.
 */

import React, { Component } from 'react';
import {AsyncStorage} from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux';

// Middleware
import thunk from 'redux-thunk';
import promise from "./promise"
import track from "./track"
import {persistStore, autoRehydrate} from 'redux-persist';

// reducers
import { navigator } from "../reduers/navigator"
import { tab } from "../reduers/tab"
import { poper } from '../reduers/poper'
import { user } from '../reduers/user'

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const createStoreWithMiddleware = applyMiddleware(
  thunk, 
  promise,
  track
)(createStore);

const reducer = combineReducers({
  navigator,
  tab,
  poper,
  user
});

let store = null

export const configureStore = (onComplete) => {
  store = autoRehydrate()(createStoreWithMiddleware)(reducer)
  persistStore(store, {storage : AsyncStorage, blacklist : ['tab', 'order', 'poper', 'product', 'navigator']}, onComplete )
  if(isDebuggingInChrome) {
    window.store = store;
  }
  return store
}

export const getStore = () => {
  return store
}



