import { 
  verifyEmailAndPassword, 
  hashPassword, 
  generateJWToken, 
  verifyPassword,
  getVerifyResetToken } from '../utils/helpers.js';
import ErrorResponse from '../utils/errorResponse.js';
import * as User from '../models/user.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import sendEmail from '../utils/sendEmail.js';

const newUserParamsFilter = [ 'name', 'email', 'password' ];

export const signin = asyncHandler( async (req, res, next) => {
  const { email, password } = req.body;

  // find if the user exists
  const user = await User.findUserByEmail(email);
  // if user does not exist and not allowed to login throw an error
  if(!user || !user.login_allowed || !user.verified.email) {
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
    role: user.role,
    verified: user.verified
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
    login_allowed: true,
    verified: {
      email: false,
      phone: false
    },
    verify_reset_token_hash: null,
    verify_reset_token_expire: null,
    request_expire: null,
    last_login: null,
    createdAt: new Date().toISOString(),
    updatedAt: null
  }

 // save to the database
  const response = await User.createUser(signupData);

  // fetch the created user to send and email to let them verify their email
  const user = await User.findUserByEmail(signupData.email);
  // this check is redundant since if the user does not exist means we can not reach here 
  if(!user){
    throw new ErrorResponse('email can not send', 404);
  }
  // get verification and reset password token
  const verifyResetToken = getVerifyResetToken();

  // save the tokens in the user document in the database
  await User.updateUserVerifyResetToken(user._id, verifyResetToken);

  // take only the VRToken and create the url for the user to click during verification
  const { VRToken } = verifyResetToken
  const verifyUrl = `${process.env.VERIFY_RESET_URL}/verifyemail/${VRToken}`


  // prepair the informations to send to the user email
  const message = `
    <h1>Email verification</h1>
    <p>Please click the following link to complete your email verification</p>
    <a href=${verifyUrl}>${verifyUrl}</a>
  ` 
  const to = user.email;
  const from = process.env.EMAIL_FROM;
  const subject = "Email verification";
  const id = user._id;

  // send the user an email to verify his email address
  await sendEmail({ to, from, subject, message, id })

  // send response to the request
  // in the frontend show what to do next in a page( to go to their email address and click the link
  res.status(201).json({ 
    message: 'Signup successfully' ,
    id: user._id,
    email: user.email,
    role: user.role,
    verified: user.verified
  })
})
