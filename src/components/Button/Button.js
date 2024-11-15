import styles from "./Button.module.scss";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.Button} ${className}`} {...props}>
      {children}
    </button>
  );
};
