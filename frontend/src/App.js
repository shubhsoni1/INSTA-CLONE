import React,{useState} from "react";
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./component/Modal";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Profile from './component/Profile';
import Createpost from './component/Createpost';
import { LoginContext } from "./context/LoginContext.js";
import UserProfile from "./component/UserProfile";
import MyFollowingPost from "./component/MyFollowingPost";
function App() {
  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen,setModalOpen]=useState(false);

  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}} >
      <Navbar login={userLogin}/>
      
      <Routes>
        <Route path="/signUp" element={<SignUp/>}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/createPost" element={<Createpost/>}></Route>
        <Route path="/profile/:userid" element={<UserProfile/>}></Route>
        <Route path="/followingpost" element={<MyFollowingPost/>}></Route>

      </Routes>

      <ToastContainer/>
      {/* <Modal></Modal> */}
      {modalOpen&&<Modal setModalOpen={setModalOpen} ></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>

  );
}

export default App;
