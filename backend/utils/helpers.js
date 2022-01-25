import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from './errorResponse.js';
const email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export const verifyEmailAndPassword = ({email, password}) => {
  // password must exist and should be greater than 3 characters
  // email must exist and satisfy the email regular expression
  if(!password || password.length < 3 || !email || !email.match(email_regex)){
    throw new ErrorResponse('signup error, invalid email/password', 400)
  }
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, +process.env.BCRYPT_SALT)
}

export const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash); 
}

export const generateJWToken = async (payload) => {
  return await jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: '7d'
    }
  )
}
