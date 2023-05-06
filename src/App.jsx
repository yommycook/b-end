import React, {useState} from 'react';
import './App.css';
import Main from './component/main/Main';
import Login from './component/login/Login';
import Header from './component/header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = ({FireBaseAuth}) => {
  const [isLogin, setLogin] = useState({
    state: false
  })
  return (
    (<BrowserRouter>
      <div className={`main`}>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/" exact={true} element={<Login setLogin={setLogin} FireBaseAuth={FireBaseAuth} isLogin={isLogin}/>} />
          <Route path="/main" exact={true} element={<Main setLogin={setLogin} FireBaseAuth={FireBaseAuth} isLogin={isLogin} />} />
        </Routes>
      </div>
      </BrowserRouter>)
  );
}

export default App;
