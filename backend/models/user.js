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
  return await User.updateOne({_id: id}, { $currentDate: { lastLogin: true}});
})
