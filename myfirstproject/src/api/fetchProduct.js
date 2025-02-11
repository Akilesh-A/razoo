import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = "http://localhost:5000/";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${apiurl}api/products`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products: ' + error.message);
    }
  }
);
