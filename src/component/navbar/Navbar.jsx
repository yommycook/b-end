import React from 'react';
import Styles from './navbar.module.css';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();
  const onCreateClick = () => {
    navigate("/create");
  }
	return (
		<div className={Styles.navbar__container}>
			<div className={Styles.navbar}>
				<div className={Styles.myrecipe}>나의 레시피</div>
				<div onClick={onCreateClick} className={Styles.create}>레시피 만들기</div>
				<div className={Styles.measurement}>간이계량</div>
				<div className={Styles.mypage}>나의페이지</div>
			</div>
		</div>
	);
};

export default Navbar;
