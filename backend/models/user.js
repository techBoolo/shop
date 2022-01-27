import asyncHandler from '../middlewares/asyncHandler.js';
import { getDB } from '../config/db.js';
import { hashPassword } from '../utils/helpers.js';

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
export const findUserByVRTokenHash = asyncHandler( async (VRTokenHash) => {
  const User = getDB().collection('users');
  return await User.findOne({
    verify_reset_token_hash: VRTokenHash,
    verify_reset_token_expire: { $gt: Date.now() }
  })
})

export const updateUserEmailVerification = asyncHandler( async (id) => {
  const User = getDB().collection('users');
  await User.updateOne({ _id: id}, { $set: { 'verified.email': true}})
  return await updateUserVerifyResetToken(id, { VRTokenHash: undefined , VRTokenExpire: undefined})
})

export const resetPassword = asyncHandler( async (id, password) => {
  const User = getDB().collection('users');
  const hashedPassword = await hashPassword(password)
  await User.updateOne({_id: id}, { $set: { password: hashedPassword }})
  return await updateUserVerifyResetToken(id, {VRTokenHash: undefined, VRTokenExpire: undefined})
});
