import styles from "./ToDoList.module.scss";

export const ToDoList = ({ children }) => {
  return (
    <ul className={styles.ToDoList}>
      {children.length > 0 ? children : "У вас пока нет задач к этому проекту"}
    </ul>
  );
};
