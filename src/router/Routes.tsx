import {  Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserLogin from '../pages/UserLogin';
import UserProfile from '../pages/UserProfilePage';
import UserRegister from '../pages/UserRegister';


const Router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<HomePage/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/userregister" element={<UserRegister/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
      </>
    )
  )

export default Router;
