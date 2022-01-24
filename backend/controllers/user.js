import { verifyEmailAndPassword, hashPassword, generateJWToken } from '../utils/helpers.js';
import ErrorResponse from '../utils/errorResponse.js';
import * as User from '../models/user.js';
import asyncHandler from '../middlewares/asyncHandler.js';
const newUserParamsFilter = [ 'name', 'email', 'password' ];

export const signup = asyncHandler(async (req, res, next) => {
  // filter user sent data
  const userData = JSON.parse(JSON.stringify(req.body, newUserParamsFilter));

  // check if both email and password exists and satisfy the requirements
  verifyEmailAndPassword(userData);

  // does the user exists
  if(await User.findUserByEmail(userData.email)) {
    throw new ErrorResponse('Account already exists', 409);
  }

  // hash the password with bcrypt
  const hashedPassword = await hashPassword(userData.password);

  // populate user data
  const signupData = {
    ...userData,
    password: hashedPassword,
    phone: null,
    role: 'User',
    loginAllowed: true,
    verified: {
      email: false,
      phone: false
    },
    hash_token: null,
    expire_token: null,
    lastLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: null
  }

  // save to the database
  const response = await User.createUser(signupData);

  // create the payload
  const payload = {
    id: response.insertedId.toString(),
    email: signupData.email,
    role: signupData.role,
  }

  // generate a token for the user with jsonwebtoken
  const token = await generateJWToken(payload); 

  // send response to the request
  res.status(201).json({ 
    message: 'Signup successfully' ,
    ...payload,
    token
  })
})
