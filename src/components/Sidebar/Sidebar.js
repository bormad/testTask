import styles from "./Sidebar.module.scss";

import { Icon, MyLink, UserPanel } from "../../components";

import sidebarIcon from "../../assets/icon/close-open-sidebar-icon.png";

import { useState } from "react";
import { useUser } from "../../helpers";

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const user = useUser();
  const userLogin = user.login;

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <aside
      className={`${styles.Sidebar} ${isVisible ? styles.open : styles.close}`}
    >
      <div className={styles.Sidebar__header}>
        <MyLink to={userLogin ? "/profile" : "/"}>
          <UserPanel />
        </MyLink>
        <Icon src={sidebarIcon} onClick={toggleSidebar} />
      </div>

      <MyLink to={"/main"} decoration>
        Главная страница
      </MyLink>
    </aside>
  );
};
