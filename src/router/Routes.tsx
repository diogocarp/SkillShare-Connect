import {  Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation  } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserLogin from '../pages/UserLogin';
import UserProfile from '../pages/UserProfilePage';
import UserRegister from '../pages/UserRegister';
import PostCreate from '../pages/PostCreate';

const RootRoute = () => {
  const { pathname } = useLocation(); 

  if (pathname === "/") {
    return <Navigate to="/feed" />; 
  }

  return null; 
};

const Router = createBrowserRouter(
    createRoutesFromElements(
      
     
        <>
        <Route path="/" element={<RootRoute />} />
        <Route path="/feed" element={<HomePage/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/userregister" element={<UserRegister/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/postcreate" element={<PostCreate/>} />
      </>
    )
  )

export default Router;
