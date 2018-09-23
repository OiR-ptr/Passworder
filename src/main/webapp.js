import React from 'react';
import ReactDOM from 'react-dom';
import Test from '../reducers/app';
import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
