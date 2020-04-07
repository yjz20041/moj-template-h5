// ReactDom need Map and Set Polyfill
import 'core-js/modules/es.map';
import 'core-js/modules/es.set';
import { React, Suspense, lazy } from 'react';
import ReactDom from 'react-dom';
import '@css/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@redux/store';
import LoadingErrorPage from '@component/loading-error-page';


window.Promise = Promise;

const Home = lazy(() => import('@container/home'));


const container = document.getElementById('g-bd');
// TODO: 增加组件级的reload
if (module.hot) {
    ReactDom.unmountComponentAtNode(container);
    module.hot.accept();
}
ReactDom.render(
    <Provider store={store}>
        <Router basename="/projectName">
            <Suspense fallback={<LoadingErrorPage />}>
                <Route exact path="/" component={Home} />
            </Suspense>
        </Router>
    </Provider>,
    container
);
