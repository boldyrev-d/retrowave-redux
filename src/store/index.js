/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';

import rootReducer from '../reducer';

import callAPI from '../middlewares/api';
import nextTrack from '../middlewares/nextTrack';

const middlewares = [nextTrack, callAPI];

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });

  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares), persistState()),
);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
