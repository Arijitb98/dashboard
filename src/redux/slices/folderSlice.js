import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummyFolders } from "../DummyData/dummyData";
import axios from "axios";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

// Thunk to fetch folders and phases
export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async (_, { rejectWithValue }) => {
    try {
      // The lines below for using the actual API request
      // const response = await axios.get(`${API_BASE_URL}/records`);
      // return response.data;

      // Line below for using dummy data for testing purposes
      return dummyFolders;
    } catch (error) {
      // Return error message if the request fails
      return rejectWithValue(
        error.message || "An error occurred while fetching folders."
      );
    }
  }
);

const folderSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error message if the fetch fails
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors on new fetch request
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectFolders = (state) => state.folders.folders;
export const selectStatus = (state) => state.folders.status;
export const selectError = (state) => state.folders.error;

export default folderSlice.reducer;
