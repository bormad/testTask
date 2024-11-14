import styles from "./Sidebar.module.scss";

import { Button, Icon, MyLink, UserPanel } from "../../components";

import sidebarIcon from "../../assets/icon/close-open-sidebar-icon.png";

import { useState } from "react";
import { useUser } from "../../helpers";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useUser();
  const userLogin = user.login;
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`${styles.Sidebar} ${isVisible ? styles.open : styles.close}`}
    >
      <div className={styles.Sidebar__header}>
        <MyLink to={userLogin ? "/profile" : "/"}>
          <UserPanel />
        </MyLink>
        <Icon src={sidebarIcon} onClick={toggleSidebar} />
      </div>
      <Button onClick={() => dispatch(openModal())}>Добавить проект</Button>
      <MyLink to={"/main"}>Главная страница</MyLink>
    </div>
  );
};
