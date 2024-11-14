import { useUser } from "../../../../helpers";
import styles from "./UserName.module.scss";

export const UserName = () => {
  const user = useUser();
  const userLogin = user.login;

  return (
    <div className={styles.UserName}>{userLogin ? userLogin : "login"}</div>
  );
};
