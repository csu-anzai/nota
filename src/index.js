import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/index.css';
import './styles/cssTransitions.css';
import App from './root/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import bible from './shared/books/parsedBook';

window.bible = bible

export const store = configureStore();

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
