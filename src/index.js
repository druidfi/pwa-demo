import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { App } from './components/App';
import { initializeStore } from './stores/initializeStore';
import { initializeFirebase } from './functions/initializeFirebase';

const store = initializeStore();

initializeFirebase();

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({ onRegister: (registration, token) => store.setToken(token)});
