import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer';
import callAPI from '../middlewares/api';
import nextTrack from '../middlewares/nextTrack';

const middlewares = [nextTrack, callAPI];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });

  middlewares.push(logger);
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
