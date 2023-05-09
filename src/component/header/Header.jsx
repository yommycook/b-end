import React, { useEffect } from 'react';
import Styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
const Header = ({ isLogin, setLogin, FireBaseAuth }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLogin.state) {
			navigate('/');
      FireBaseAuth.checkLoginState(setLogin);
		}
	}, [isLogin, setLogin, FireBaseAuth, navigate]);

	const onSignOut = async () => {
		const signOut = await FireBaseAuth.signOut();
		if (signOut)
			setLogin({
				state: false,
			});
	};

	const onGoogleLogin = async () => {
		const info = await FireBaseAuth.onLogin();
		if (info) {
			const {
				user: { uid, email, photoURL },
			} = info;
			console.log('Login.jsx: ', uid);
			setLogin({
				state: true,
				user: {
					uid,
					email,
					profile: photoURL,
				},
			});
		}
	};

	const loginStat = isLogin.state;

	return (
		<div className={Styles.header}>
			<div></div>
			<span>Yommy</span>
			<div>
				{loginStat ? (
					<button className={Styles.loginBtn} onClick={onSignOut}>로그아웃</button>
				) : (
					<button className={Styles.loginBtn} onClick={onGoogleLogin}>로그인</button>
				)}
			</div>
		</div>
	);
};

export default Header;
