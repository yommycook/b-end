import React, { useEffect } from "react";
// import Styles from './main.module.css';
import { useNavigate } from "react-router";

const Main = ({isLogin}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLogin.state){
      navigate("/");
    }
  }, [isLogin, navigate]);



  return (
    <div>
      Main
    </div>
  )
}


export default Main;