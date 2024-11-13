import styles from "./UserPanel.module.scss";

import { Icon } from "../Icon/Icon";
import { UserName } from "../UserPanel/components/UserName/UserName";

import userIcon from "../../assets/icon/user-icon.png";

export const UserPanel = () => {
  return (
    <div className={styles.UserPanel}>
      <Icon src={userIcon} alt="Иконка пользователя" />
      <UserName />
    </div>
  );
};
