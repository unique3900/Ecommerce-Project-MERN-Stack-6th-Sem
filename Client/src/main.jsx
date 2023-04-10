import React from 'react'
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
   <ToastContainer/>
  </BrowserRouter>,

)
