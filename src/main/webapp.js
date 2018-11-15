import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from '../reducers/app';
import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<RootComponent />, document.getElementById('root'));
registerServiceWorker();
