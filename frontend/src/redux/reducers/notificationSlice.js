import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { data: null }

const reset = createAsyncThunk(
  'notification/notify',
  async (thunkAPI) => {
    return null
  }
)
export const notify = createAsyncThunk(
  'notification/notify',
  async (data, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(reset())
    }, 5000);
    return data
  }
)

const notificationSlice =  createSlice({
  name: 'notification',
  initialState,
  reducers: {

  }, 
  extraReducers: (builder) => {
    builder
      .addCase(notify.fulfilled, (state, action) => {
        state.data = action.payload
      })
  }
})

export default notificationSlice.reducer;

