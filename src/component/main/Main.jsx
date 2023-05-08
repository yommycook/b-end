import React, { useEffect } from "react";
import Styles from './main.module.css';
import { useNavigate } from "react-router";

const Main = ({setLogin, FireBaseAuth, isLogin}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLogin.state){
      navigate("/");
    }
  }, [isLogin, setLogin, FireBaseAuth, navigate]);

  const onSignOut = async () => {
    const signOut = await FireBaseAuth.signOut();
    if(signOut) setLogin({
      state:false
    })
  }

  return (
    <div>
      Main
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  )
}


export default Main;