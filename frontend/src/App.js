import './App.css';
import Router from './router.js';
import Navbar from './components/navbar.js';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Notification from './components/Notification.js';

function App() {
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
