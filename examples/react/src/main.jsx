import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";

import AboutMfga from "./pages/AboutMfga.jsx";
import Form1 from "./pages/Form1.jsx";
import Form2 from "./pages/Form2.jsx";
import Form3 from "./pages/Form3.jsx";
import Form4 from "./pages/Form4.jsx";
import FormUsingLoaderData from "./pages/FormUsingLoaderData.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={
        createBrowserRouter(
            createRoutesFromElements(
                <Route element={<App/>}>
                    <Route path={'/'} element={<AboutMfga/>} loader={
                      async ()=> (await fetch('/README.md')).text()
                    }/>
                    <Route path={'/form-1'} element={<Form1/>}/>
                    <Route path={'/form-2'} element={<Form2/>}/>
                    <Route path={'/form-3'} element={<Form3/>}/>
                    <Route path={'/form-4'} element={<Form4/>}/>
                    <Route path={'/form-using-loader-data'} element={<FormUsingLoaderData/>} loader={
                      async ()=> (await fetch('/data.json')).json()
                    }/>                    
                </Route>
            )
        )
    } />
  </React.StrictMode>,
)
