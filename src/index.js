import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import Sketchbook from './sketchbook';
import Paintings from './paintings';
import About from './about';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter >
    <Routes>
      <Route exact path="/" element={<Sketchbook/>} />
      <Route exact path="/drawings" element={<Sketchbook/>} />
      <Route exact path="/paintings" element={<Paintings/>} />
      <Route exact path="/about" element={<About/>} />
    </Routes>
  </BrowserRouter >
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
