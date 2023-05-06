import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseService } from './services';

const FireBaseAuth = new FirebaseService();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App FireBaseAuth={FireBaseAuth}/>
	</React.StrictMode>
);
