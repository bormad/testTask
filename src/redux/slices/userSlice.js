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
        projects: [],
      });
      if (response.data.error) {
        throw response.data.error;
      }
      sessionStorage.setItem("userData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return initialState;
    }
  }
);

export const addProjectToServer = createAsyncThunk(
  "user/addProjectToServer",
  async ({ userId, project }, { dispatch }) => {
    try {
      const userData = sessionStorage.getItem("userData");
      const user = JSON.parse(userData);

      const existingProjects = user.projects || [];
      const updatedProjects = [...existingProjects, project];

      const response = await axios.patch(
        `http://localhost:3001/users/${userId}`,
        {
          projects: updatedProjects,
        }
      );

      if (response.data.error) {
        throw response.data.error;
      }

      dispatch(fetchUser({ login: user.login, password: user.password }));

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addTodoToProject = createAsyncThunk(
  "user/addTodoToProject",
  async ({ userId, projectId, todo }, { dispatch }) => {
    try {
      const userData = sessionStorage.getItem("userData");
      const user = JSON.parse(userData);
      const project = user.projects.find(
        (proj) => proj.id === Number(projectId)
      );
      if (!project) {
        throw new Error("Project not found");
      }

      const updatedTodos = [...project.todos, todo];

      const response = await axios.patch(
        `http://localhost:3001/users/${userId}`,
        {
          projects: user.projects.map((proj) =>
            proj.id === Number(projectId)
              ? { ...proj, todos: updatedTodos }
              : proj
          ),
        }
      );

      if (response.data.error) {
        throw response.data.error;
      }

      dispatch(fetchUser({ login: user.login, password: user.password }));

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  user: {
    id: null,
    login: null,
    projects: [],
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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addProjectToServer.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addTodoToProject.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
