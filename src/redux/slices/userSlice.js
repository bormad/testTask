import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ login, password }) => {
    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: {
          login,
          password,
        },
      });
      if (response.data.error) {
        throw response.data.error;
      }
      sessionStorage.setItem("userData", JSON.stringify(response.data[0]));
      console.log(response.data[0]);
      return response.data[0];
    } catch (error) {
      return initialState;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, password }) => {
    try {
      const response = await axios.post("http://localhost:3001/users", {
        login,
        password,
      });
      if (response.data.error) {
        throw response.data.error;
      }
      sessionStorage.setItem("userData", JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      return initialState;
    }
  }
);

const initialState = {
  user: {
    id: null,
    login: null,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = initialState;
      sessionStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
