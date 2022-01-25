import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from './errorResponse.js';
const email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/


// password must exist and should be greater than 3 characters
// email must exist and satisfy the email regular expression
export const verifyEmailAndPassword = ({email, password}) => {
  if(!password || password.length < 3 || !email || !email.match(email_regex)){
    throw new ErrorResponse('signup error, invalid email/password', 400)
  }
}

// hash the user provided password to save it in the database
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, +process.env.BCRYPT_SALT)
}

// check if user password matches with the saved one
export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash); 
}

// user authentication jsonwebtoken
export const generateJWToken = async (payload) => {
  return await jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: '7d'
    }
  )
}
