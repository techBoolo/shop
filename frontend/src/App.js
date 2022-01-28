import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { login } from './redux/reducers/userSlice.js';

import './App.css';
import Router from './router.js';
import Navbar from './components/navbar.js';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Notification from './components/Notification.js';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem('currentUser')    
    if(currentUserJSON) {
      const loggedInUser = JSON.parse(currentUserJSON);
      dispatch(login(loggedInUser));
    }
  }, [ dispatch ])

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='lg'>
        <Notification />
        <Router />
      </Container>
    </>
  );
}

export default App;
