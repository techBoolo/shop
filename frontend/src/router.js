import { Routes, Route } from 'react-router-dom';
import Signup from './pages/user/signup.js';
import Signin from './pages/user/signin.js';
import SignupSuccess from './pages/user/signup-success.js';
import Users from './pages/user/users.js';
import ForgotPassword from './pages/user/forgot-password.js';
import ResetPassword from './pages/user/reset-password.js';
import Profile from './pages/user/Profile.js';
import Nomatch from './pages/no_match.js';
import Contact from './pages/contact.js';
import About from './pages/about.js';
import Home from './pages/home.js';

const Router = () => {
  return (
    <Routes>
      <Route path='/users'>
        <Route index element={<Users />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signup-success' element={<SignupSuccess />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password/:VRToken' element={<ResetPassword />} />
        <Route path=':id' element={<Profile />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Nomatch />} />
    </Routes>
  )
}

export default Router;
