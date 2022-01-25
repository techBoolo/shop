import { verifyEmailAndPassword, hashPassword, generateJWToken, verifyPassword } from '../utils/helpers.js';
import ErrorResponse from '../utils/errorResponse.js';
import * as User from '../models/user.js';
import asyncHandler from '../middlewares/asyncHandler.js';
const newUserParamsFilter = [ 'name', 'email', 'password' ];

export const signin = asyncHandler( async (req, res, next) => {
  const { email, password } = req.body;

  // find if the user exists
  const user = await User.findUserByEmail(email);
  // if user does not exist and not allowed to login throw an error
  if(!user || !user.loginAllowed) {
    throw new ErrorResponse("Authentication failed", 401);
  }
  
  // compare if user provided password is correct
  const compareResult = await verifyPassword(password, user.password)
  // if password is wrong throw an error
  if(!compareResult) {
    throw new ErrorResponse("Authentication failed", 401);
  }

  // payload to generate the jsonwebtoken
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role
  }
  // create the jwt
  const token = await generateJWToken(payload);

  // update user lastLogin field in the database
  await User.updateLastLogin(user._id);

  res.status(200).json({ message: 'signin successfully', ...payload, token})
})

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
    request_expire: null,
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
