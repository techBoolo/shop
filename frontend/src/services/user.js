import axios from 'axios';

export const signup = async (signupData) => {
  return await axios.post('/users/signup', signupData); 
}

export const signin = async (signinData) => {
  return await axios.post('/users/signin', signinData);
}
