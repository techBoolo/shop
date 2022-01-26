import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [],
  user: null,
  currentUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: {

  }
})

export default userSlice.reducer;
