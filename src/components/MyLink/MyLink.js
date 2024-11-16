import styles from "./MyLink.module.scss";
import { Link } from "react-router-dom";

export const MyLink = ({ children, to, decoration = false }) => {
  return (
    <Link
      className={`${styles.MyLink} ${decoration && styles.MyLink__decoration}`}
      to={to}
    >
      {children}
    </Link>
  );
};
