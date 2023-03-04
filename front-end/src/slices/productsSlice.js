import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  count: 0,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts/products",
  async (thunkAPI) => {
    try {
      const resp = await axios.get("/api/products");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Cannot retrieve products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct/products",
  async (item, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/products", item);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Cannot create product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {})
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.items = [];
      })
      .addCase(createProduct.pending, (state) => {})
      .addCase(createProduct.fulfilled, (state, action) => {})
      .addCase(createProduct.rejected, (state, action) => {});
  },
});

export default productsSlice.reducer;
