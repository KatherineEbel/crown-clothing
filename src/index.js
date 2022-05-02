import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Elements} from "@stripe/react-stripe-js";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import { stripePromise } from "./stripe/stripe.utils";


const jsx = (

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App/>
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

render(jsx, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
