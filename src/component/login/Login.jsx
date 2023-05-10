import React, { useEffect } from 'react';
import Styles from './login.module.css';
import { useNavigate } from 'react-router';

const Login = ({ isLogin }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (isLogin.state) {
			navigate('/main');
		}
	}, [isLogin, navigate]);
	
	return (
		<div>
    Login
		</div>
	);
};

export default Login;
