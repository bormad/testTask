import styles from "./MyLink.module.scss";
import { Link } from "react-router-dom";

export const MyLink = ({ children, to }) => {
  return (
    <Link className={styles.MyLink} to={to}>
      {children}
    </Link>
  );
};
