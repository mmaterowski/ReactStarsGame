import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StarMatch from './StarMatch'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<StarMatch />, document.getElementById('root'));

serviceWorker.unregister();
