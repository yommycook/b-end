import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseDBService, FirebaseService, cloudinaryService } from './services';


const FireBaseAuth = new FirebaseService();
const Cloudinary = new cloudinaryService();
const DBService = new FirebaseDBService(Cloudinary);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<App Cloudinary={Cloudinary} FireBaseAuth={FireBaseAuth} DBService={DBService}/>
);
