import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import ClientContext from './socket/socketContext.js';

const serverUrl = process.env.NODE_ENV === 'production' ?  '/' : 'ws://localhost:3001';
const client = io(serverUrl, { transports: ['websocket'] });

ReactDOM.render(
  <div className="full-height">
    <ClientContext.Provider value={ client }>
      <App />
    </ClientContext.Provider>
  </div>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
