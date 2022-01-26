import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate }  from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dotenv from 'dotenv';
import ReCaptcha from 'react-google-recaptcha';
import * as userAPI from '../../services/user.js';
import { notify } from '../../redux/reducers/notificationSlice';

import errorMessage from '../../utils/errorMessage'; 

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
dotenv.config();

const Signup = (props) => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const recaptchaRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignup = async (ev) => {
    ev.preventDefault()
    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    const signupData = {
      name, email, password,captchaToken
    }
    try {
      const { data } = await userAPI.signup(signupData) 
      dispatch(notify({ message: data.message, _status: 'success' }))
      navigate('/users/signup-success');
    } catch (error) {
      const message = errorMessage(error);
      dispatch(notify({ message, _status: 'error' }))
    }
  }

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} sx={{mt: 10, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mb: 2 }} variant='h6'>
          signup      
        </Typography>
        <Stack>
          <Stack component='form' onSubmit={handleSignup} spacing={2}>
            <TextField
              required
              autoFocus
              label='Name'
              size='small'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <TextField
              required
              label='Email'
              type='email'
              size='small'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <TextField
              required
              label='Password'
              type='password'
              size='small'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button  variant='contained' type='submit' sx={{}}>Signup</Button>
          </Stack>
          <Link sx={{ alignSelf: 'end' }} component={RouterLink} to='/users/signin'>signin</Link>
        </Stack>
        <ReCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size='invisible' ref={recaptchaRef}/>
      </Paper>
    </Container>
  );
};

export default Signup
