import { fetchUser } from "../redux/slices/userSlice";

export const handleError = (response) => {
  if (response.data.error) {
    throw new Error(response.data.error);
  }
};

export const saveUserData = (data) => {
  if (data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
  } else {
    console.error("No data to save");
  }
};

export const updateUser = (dispatch, user) => {
  dispatch(fetchUser({ login: user.login, password: user.password }));
};
