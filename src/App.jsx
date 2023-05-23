import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from './component/main/Main';
import Login from './component/login/Login';
import Header from './component/header/Header';
import Navbar from './component/navbar/Navbar';
import CreateRecipe from './component/createrecipe/CreateRecipe';

const App = ({Cloudinary, FireBaseAuth, DBService}) => {
  const [isLogin, setLogin] = useState({
    state: false
  })
  return (
    (<BrowserRouter>
      <div className={`main`}>
        <Header isLogin={isLogin} setLogin={setLogin} FireBaseAuth={FireBaseAuth} />
        <Navbar />
        <Routes>
          <Route path="/" exact={true} element={<Login isLogin={isLogin}/>} />
          <Route path="/main" exact={true} element={<Main isLogin={isLogin} />} />
          <Route path="/create" exact={true} element={<CreateRecipe Cloudinary={Cloudinary} DBService={DBService}/>} />
        </Routes>
      </div>
      </BrowserRouter>)
  );
}

export default App;
