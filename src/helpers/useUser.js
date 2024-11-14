import { useSelector } from "react-redux";

export function useUser() {
  const userFromRedux = useSelector((state) => state.userSlice.user);
  const userData = sessionStorage.getItem("userData");

  let user = {};

  if (userFromRedux) {
    user = userFromRedux;
  }

  if (userData) {
    const users = JSON.parse(userData);
    user = users;
  }

  return user;
}
