import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiFetch } from 'modules/api';

import { reducers } from './reducers';

export function configureStore() {
  const middlewares = [
    thunk.withExtraArgument(apiFetch),
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index').reducers;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
