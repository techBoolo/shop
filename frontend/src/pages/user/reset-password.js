import { useState, useRef } from 'react'
import  ReCaptcha  from 'react-google-recaptcha';
import dotenv from 'dotenv';
import { useDispatch } from 'react-redux';
import { notify } from '../../redux/reducers/notificationSlice.js';
import * as userAPI from '../../services/user.js';
import errorMessage from '../../utils/errorMessage.js';
import { useNavigate, useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
dotenv.config();

const ResetPassword = (props) => {
  const [ password, setPassword ] = useState('')
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('')
  const recaptchaRef = useRef();

  const dispatch = useDispatch();
  const { VRToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const captchaToken = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();

    if(password !== passwordConfirmation) {
      setPassword('')
      setPasswordConfirmation('')
      return dispatch(notify({ message: 'Password do not match', _status: 'error'}))
    }   

    try {
      const { data } = await userAPI.resetPassword({ VRToken, password, captchaToken }); 
      dispatch(notify({ message: data.message, _status: 'success'}));
      navigate('/users/signin');
    } catch (error) {
      const message = errorMessage(error);
      dispatch(notify({ message, _status: 'error'}))
      navigate('/users/signin')
    } 
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 10 }}>
        <Typography variant='h6' sx={{mb: 2,  textAlign: 'center'}}>Reset password</Typography>
        <Stack component='form' onSubmit={handleSubmit} spacing={2}>
          <TextField
            required
            autoFocus
            type='password'
            label='Password'
            size='small'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <TextField
            required
            type='password'
            label='Confirm Password'
            size='small'
            helperText='* confirm password must be same as the password'
            value={passwordConfirmation}
            onChange={(ev) => setPasswordConfirmation(ev.target.value)}
          />
          <Button variant='contained' type='submit'>Reset</Button>
        </Stack>
        <ReCaptcha
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          size='invisible'
          ref={recaptchaRef}
        />
      </Box>
    </Container>
  );
};

export default ResetPassword;
