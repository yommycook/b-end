import React, { useEffect, useState } from "react";
import Styles from './login.module.css';
import { useNavigate } from "react-router";

const Login = ({setLogin, FireBaseAuth, isLogin}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(isLogin.state){
      navigate("/main")
    }
  }, [isLogin])
  const onGoogleLogin = async () => {
    const info = await FireBaseAuth.onLogin();
    console.log(info);
  }
  return (
    <div>
      <button onClick={onGoogleLogin}>Sign in with Google</button>
    </div>
  )
}


export default Login;