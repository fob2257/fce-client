import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.style.css';

import * as serviceWorker from './serviceWorker';

import { ContextProvider } from './Context';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import DetailsPage from './pages/DetailsPage';

const Root = () => (
  <div className='root'>
    <ContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <div className='container'>
            <Route path='/form' component={FormPage} />
            <Route exact path='/details' component={DetailsPage} />
            <Route path='/details/:id' component={DetailsPage} />
            <Route path='/not-found' component={NotFound} />
            {/* <Redirect to='/not-found' /> */}
          </div>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </ContextProvider>
  </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
