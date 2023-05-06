import React, {useEffect} from "react";
import Styles from './header.module.css';
import {useNavigate} from "react-router-dom";
const Header = ({isLogin}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLogin.state){
      navigate("/");
    }
  }, [isLogin])
  return (
    <div className={Styles.header}>
      <span>Yummy</span>
    </div>
  )
}


export default Header;