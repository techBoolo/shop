import axios from 'axios';

export const signup = async (signupData) => {
  return await axios.post('/users/signup', signupData); 
}

export const signin = async (signinData) => {
  return await axios.post('/users/signin', signinData);
}

export const forgotpassword = async (resetData) => {
  return await axios.post('/users/forgot-password', resetData)
}

export const resetPassword = async ({ VRToken, password}) => {
  return await axios.put('/users/reset-password', { VRToken, password }) 
}
