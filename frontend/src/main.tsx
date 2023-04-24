import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import {  apiSlice } from "./features/api/apiSlice";
import { Provider } from 'react-redux';
import { store } from './app/store.ts';


// store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(apiSlice.endpoints.registerUser.initiate());


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
     {/* <ApiProvider api={apiSlice}> */}
    <App />
    {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
)
