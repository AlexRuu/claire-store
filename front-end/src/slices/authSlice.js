import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};

export const fetchUser = createAsyncThunk(
  "login/fetchUser",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/profile");
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        console.log(state);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.log(action);
        console.log(state);
      });
  },
});

console.log(authSlice);

export default authSlice.reducer;
