import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";
import FormExample from "./pages/FormExample.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                <Route element={<App/>}>
                    <Route path={'/'} element={<FormExample/>} loader={
                      async ()=> (await fetch('/data.json')).json()
                    }/>
                </Route>
            )
        )
    } />
  </React.StrictMode>,
)
