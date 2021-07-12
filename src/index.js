import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import Sketchbook from './sketchbook';
import Paintings from './paintings';
import Admin from './admin';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route exact path="/" component={Sketchbook} />
      <Route exact path="/drawings" component={Sketchbook} />
      <Route exact path="/paintings" component={Paintings} />
      <Route exact path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
