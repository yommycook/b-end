import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseService, cloudinaryService } from './services';

const FireBaseAuth = new FirebaseService();
const Cloudinary = new cloudinaryService();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<App Cloudinary={Cloudinary} FireBaseAuth={FireBaseAuth}/>
);
