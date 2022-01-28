import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from '../../services/user.js';
import errorMessage from '../../utils/errorMessage.js';
import { notify } from './notificationSlice.js';

const initialState = {
  loading: false,
  users: [],
  user: null,
  currentUser: null
}

export const signin = createAsyncThunk(
  'user/signin',
  async (signinData, thunkAPI) => {
    try {
      const { data } = await userAPI.signin(signinData);  
      thunkAPI.dispatch(notify({ message: data.message, _status: 'success'}))
      return data;
    } catch (error) {
      const message = errorMessage(error);
      thunkAPI.dispatch(notify({ message, _status: 'error'}))
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser  = action.payload
    },
    logout(state, action) {
      state.users = [];
      state.user = null;
      state.currentUser = null;
      window.localStorage.removeItem('currentUser');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signin.rejected, (state,action) => {
        state.currentUser = null;
        state.loading = false
      })
  }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
