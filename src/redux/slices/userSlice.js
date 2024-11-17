import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleError, saveUserData, updateUser, API_URL } from "../../helpers";

const initialState = {
  user: {
    id: null,
    login: null,
    projects: [],
  },
  error: "",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: { login, password },
      });
      handleError(response);
      saveUserData(response.data);
      return response.data[0];
    } catch (error) {
      return rejectWithValue(error.messagee);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        login,
        password,
        projects: [],
      });
      handleError(response);
      saveUserData([response.data]);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.messagee);
    }
  }
);

export const addProjectToServer = createAsyncThunk(
  "user/addProjectToServer",
  async ({ user, project }, { dispatch }) => {
    const updatedProjects = [...user.projects, project];

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: updatedProjects,
    });

    handleError(response);
    updateUser(dispatch, user);
    return response.data;
  }
);

export const editProjectToServer = createAsyncThunk(
  "user/editProjectToServer",
  async ({ user, projectId, updatedProjectData }, { dispatch }) => {
    const updatedProjects = user.projects.map((proj) =>
      proj.id === Number(projectId) ? { ...proj, ...updatedProjectData } : proj
    );

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: updatedProjects,
    });

    handleError(response);
    updateUser(dispatch, user);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "user/deleteProject",
  async ({ user, projectId }, { dispatch }) => {
    const updatedProjects = user.projects.filter(
      (proj) => proj.id !== Number(projectId)
    );

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: updatedProjects,
    });

    handleError(response);
    updateUser(dispatch, user);
    return projectId;
  }
);

export const addTodoToProject = createAsyncThunk(
  "user/addTodoToProject",
  async ({ user, projectId, todo }, { dispatch }) => {
    const project = user.projects.find((proj) => proj.id === Number(projectId));
    if (!project) {
      throw new Error("Project not found");
    }

    const updatedTodos = [...project.todos, todo];

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: user.projects.map((proj) =>
        proj.id === Number(projectId) ? { ...proj, todos: updatedTodos } : proj
      ),
    });

    handleError(response);
    updateUser(dispatch, user);
    return response.data;
  }
);

export const toggleTodoCompletion = createAsyncThunk(
  "user/toggleTodoCompletion",
  async ({ user, projectId, todoId }, { dispatch }) => {
    const project = user.projects.find((proj) => proj.id === Number(projectId));

    if (!project) {
      throw new Error("Project not found");
    }

    const updatedTodos = project.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: user.projects.map((proj) =>
        proj.id === Number(projectId) ? { ...proj, todos: updatedTodos } : proj
      ),
    });

    handleError(response);
    updateUser(dispatch, user);
    return response.data;
  }
);

export const editTodoToServer = createAsyncThunk(
  "user/editTodoToServer",
  async ({ user, projectId, todoId, newTitle }, { dispatch }) => {
    const project = user.projects.find((proj) => proj.id === Number(projectId));

    if (!project) {
      throw new Error("Project not found");
    }

    const updatedTodos = project.todos.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: user.projects.map((proj) =>
        proj.id === Number(projectId) ? { ...proj, todos: updatedTodos } : proj
      ),
    });

    handleError(response);
    updateUser(dispatch, user);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "user/deleteTodo",
  async ({ user, projectId, todoId }, { dispatch }) => {
    const project = user.projects.find((proj) => proj.id === Number(projectId));

    if (!project) {
      throw new Error("Project not found");
    }

    const updatedTodos = project.todos.filter((todo) => todo.id !== todoId);

    const response = await axios.patch(`${API_URL}/${user.id}`, {
      projects: user.projects.map((proj) =>
        proj.id === Number(projectId) ? { ...proj, todos: updatedTodos } : proj
      ),
    });

    handleError(response);
    updateUser(dispatch, user);
    return { projectId, todoId };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      sessionStorage.removeItem("userData");
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addProjectToServer.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editProjectToServer.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editTodoToServer.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addTodoToProject.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
