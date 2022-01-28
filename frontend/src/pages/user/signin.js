import { useState, useEffect, useRef } from 'react';
import { signin } from '../../redux/reducers/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import ReCaptcha from 'react-google-recaptcha';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Signin = (props) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rememberMe, setRememberMe ] = useState(true);
  const recaptchaRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user)

  const handleSignin = async (ev) => {
    ev.preventDefault()
    const captchaToken = await recaptchaRef.current.executeAsync()
    recaptchaRef.current.reset();

    const signinData = {
      email, password, rememberMe, captchaToken
    }
    setPassword('');
    dispatch(signin(signinData));
  }

  useEffect(() => {
    if(rememberMe && currentUser) {
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [rememberMe, currentUser])

  // redirect if user already loggedin, even when refreshing the url by hand
  if(currentUser) {
    return (
      <Navigate to='/' replace state={{ state:  location.pathname}}/>
    )
  }
  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 10}}>
        <Typography variant='h6' sx={{ textAlign: 'center', mb: 2}}>
          signin     
        </Typography>
        <Stack component='form' spacing={2} onSubmit={handleSignin}>
          <TextField
            required
            autoFocus
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
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(ev) => setRememberMe(ev.target.checked)} />}
            label="Remember me"
          />
          <Button variant='contained' type='submit'>Signin</Button>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Link component={RouterLink} to='/users/forgot-password'>Forgot password?</Link>
          <Link component={RouterLink} to='/users/signup'>Signup</Link>
        </Box>
        <ReCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size='invisible' ref={recaptchaRef} />
      </Box>
    </Container>
  );
};

export default Signin
