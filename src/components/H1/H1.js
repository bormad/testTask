import styles from "./H1.module.scss";

export const H1 = ({ children }) => {
  return <h1 className={styles.H1}>{children}</h1>;
};
