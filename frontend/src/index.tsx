import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch (error) {
  console.log({ error });
}
