import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRoutes } from 'redux-first-router'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routesMap } from './shared/constants/routes';
import reducers from './reducers/index';

const configureStore = (preloadedState) => {
  const { reducer, middleware, enhancer, initialDispatch } = connectRoutes(routesMap, {
    initialDispatch: false,
    // basename: '/bn-react',
  });

  const rootReducer = combineReducers({ location: reducer, ...reducers })
  const middlewares = applyMiddleware(middleware)
  const enhancers = composeWithDevTools(compose(enhancer, middlewares))

  const store = createStore(rootReducer, preloadedState, enhancers)

  initialDispatch();

  return store;
}

export default configureStore;
