import axios from 'axios';

export const signup = async (signupData) => {
  return await axios.post('/users/signup', signupData); 
}
