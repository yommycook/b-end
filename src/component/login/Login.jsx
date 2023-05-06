import React, { useEffect } from 'react';
import Styles from './login.module.css';
import { useNavigate } from 'react-router';

const Login = ({ setLogin, FireBaseAuth, isLogin }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (isLogin.state) {
			navigate('/main');
		}
		FireBaseAuth.checkLoginState(setLogin);
	}, [isLogin, setLogin, FireBaseAuth, navigate]);
	const onGoogleLogin = async () => {
		const info = await FireBaseAuth.onLogin();
		if(info){
      const {
        user: { uid, email, photoURL },
      } = info;
      console.log('Login.jsx: ',uid);
      setLogin({
        state: true,
        user: {
          uid, email, profile: photoURL
        }
      })
    }
	};
	return (
		<div>
			<button onClick={onGoogleLogin}>Sign in with Google</button>
		</div>
	);
};

export default Login;
