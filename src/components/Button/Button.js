import styles from "./Button.module.scss";

export const Button = ({ children, ...props }) => {
  return (
    <button className={styles.Button} {...props}>
      {children}
    </button>
  );
};
