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

  }
})

export default userSlice.reducer;
