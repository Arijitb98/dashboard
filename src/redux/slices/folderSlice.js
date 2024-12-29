import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummyFolders } from "../DummyData/dummyData";
import axios from "axios";

// API Base URL
const API_BASE_URL = "http://localhost:5000/api"; // Replace with your API's base URL

// Thunk to fetch folders and phases
export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async () => {
    // const response = await axios.get(`${API_BASE_URL}/records`);
    // return response.data; // Assuming the API returns the folder structure

    //-- Returning dummy data
    return dummyFolders;
  }
);

const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectFolders = (state) => state.folders.folders;
export const selectStatus = (state) => state.folders.status;

export default folderSlice.reducer;
