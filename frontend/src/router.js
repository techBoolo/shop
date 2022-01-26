import { Routes, Route } from 'react-router-dom';
import Signup from './pages/user/signup.js';
import Signin from './pages/user/signin.js';
import SignupSuccess from './pages/user/signup-success.js';
import Users from './pages/user/users.js';
import Nomatch from './pages/no_match.js';

const Router = () => {
  return (
    <Routes>
      <Route path='/users'>
        <Route index element={<Users />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signup-success' element={<SignupSuccess />} />
      </Route>
      <Route path='*' element={<Nomatch />} />
    </Routes>
  )
}

export default Router;
