import styles from "./ToDoList.module.scss";

export const ToDoList = ({ children }) => {
  return <ul className={styles.ToDoList}>{children}</ul>;
};
