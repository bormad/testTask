import styles from "./ProfilePage.module.scss";

import { Icon } from "../../components";

import logoutIcon from "../../assets/icon/logout.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const userData = sessionStorage.getItem("userData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = {};

  if (userData) {
    const users = JSON.parse(userData);
    user = users;
  }

  const onClickLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className={styles.ProfilePage}>
      <div>Логин: {user.login}</div>
      <div>Пароль: {user.password}</div>
      <Icon src={logoutIcon} onClick={onClickLogout} />
    </div>
  );
};
