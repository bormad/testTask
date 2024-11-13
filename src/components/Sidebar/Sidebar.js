import styles from "./Sidebar.module.scss";

import { Icon, MyLink, UserPanel } from "../../components";

import sidebarIcon from "../../assets/icon/close-open-sidebar-icon.png";

import { useState } from "react";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const userData =
    useSelector((state) => state.userSlice.user) ||
    sessionStorage.getItem("userData");

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`${styles.Sidebar} ${isVisible ? styles.open : styles.close}`}
    >
      <MyLink to={userData ? "/profile" : "/"}>
        <UserPanel />
      </MyLink>
      <Icon src={sidebarIcon} onClick={toggleSidebar} />
    </div>
  );
};
