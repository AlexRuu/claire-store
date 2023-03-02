import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
};
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/auth/login", user);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Cannot login");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/profile",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/profile");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No user");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (name, thunkAPI) => {
    try {
      await axios.delete("/api/auth/logout");
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {})
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
