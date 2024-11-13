import styles from "./UserName.module.scss";
import { useSelector } from "react-redux";

export const UserName = () => {
  const userFromRedux = useSelector((state) => state.userSlice.user);
  const userData = sessionStorage.getItem("userData");

  let userLogin = "";

  if (userFromRedux) {
    userLogin = userFromRedux.login;
  }

  if (userData) {
    console.log(userData);
    const users = JSON.parse(userData);
    userLogin = users.login;
  }

  return (
    <div className={styles.UserName}>{userLogin ? userLogin : "login"}</div>
  );
};
