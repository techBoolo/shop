import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReCaptcha from 'react-google-recaptcha';
import { notify } from '../../redux/reducers/notificationSlice.js';
import * as userAPI from '../../services/user.js';
import errorMessage from '../../utils/errorMessage.js';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotPassword = (props) => {
  const [ email, setEmail ] = useState('');
  const recaptchaRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    const resetData = {
      email, captchaToken
    }
    try {
      const { data } = await userAPI.forgotpassword(resetData); 
      dispatch(notify({ message: data.message, _status: 'success'})) 
      navigate('/users/signin');
    } catch (error) {
      const message = errorMessage(error);
      dispatch(notify({ message, _status: 'error'})) 
    } 
  }
  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 10 }}>
        <Typography variant='h6' sx={{ textAlign: 'center', mb: 2}}>Forgot Password</Typography>      
        <Typography variant='body2' sx={{ textAlign: 'center', mb: 2}}>do not forget to check your email after submitting your request, we will send you password reset url to your email.</Typography>
          <Stack  component='form' onSubmit={handleSubmit}spacing={1}>
            <TextField
              required
              autoFocus
              label='Email'
              type='email'
              size='small'
              value={email} 
              onChange={(ev) => setEmail(ev.target.value)}
              helperText='Please enter your email and click submit to reset your password!'
            />
            <Button variant='contained' type='submit'>Submit</Button>
        </Stack>
      </Box>
      <ReCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size='invisible' ref={recaptchaRef} />
    </Container>
  );
};

export default ForgotPassword
