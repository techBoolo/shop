import asyncHandler from '../middlewares/asyncHandler.js';
import { getDB } from '../config/db.js';

export const findUserByEmail = asyncHandler(async (email) => {
  const User = getDB().collection('users');
  return await User.findOne({ email: email });
})

export const createUser = asyncHandler(async (userData) => {
  const User = getDB().collection('users');
  return await User.insertOne(userData);
})

export const updateLastLogin = asyncHandler(async (id) => {
  const User = getDB().collection('users');
  return await User.updateOne({_id: id}, { $currentDate: { last_login: true}});
})

export const updateUserVerifyResetToken = asyncHandler( async (id, token) => {
  const User = getDB().collection('users');
  const { VRTokenHash, VRTokenExpire } = token;
  await User.updateOne(
    { _id: id}, 
    { $set: { verify_reset_token_hash: VRTokenHash, verify_reset_token_expire: VRTokenExpire}}
  )
})
