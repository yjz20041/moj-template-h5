// ReactDom need Map and Set Polyfill
import 'core-js/modules/es.map';
import 'core-js/modules/es.set';
import React from 'react';
import ReactDom from 'react-dom';
import '@css/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '@container/Home';
import {Provider} from 'react-redux';
import store from '@redux/store';

window.Promise = Promise;


const container = document.getElementById('g-bd');
// TODO: 增加组件级的reload
if (module.hot) {
  ReactDom.unmountComponentAtNode(container)
  module.hot.accept();
}
ReactDom.render(
  <Provider store={store}>
    <Router basename="/{{projectName}}">
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  </Provider>
  , container);
