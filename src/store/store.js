import {compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import {rootReducer} from "./root-reducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";

const notProduction = process.env.NODE_ENV !== 'production';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleware = [sagaMiddleware, notProduction && logger].filter(Boolean)

let composeEnhancer = (notProduction && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middleware))


export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
