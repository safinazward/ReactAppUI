import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import logger from 'redux-logger'

import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState = {}) {
	//return createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant(), thunk, logger)));
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant(), thunk)));
}
