import { useDispatch } from "react-redux";
import styles from "./ToDoItem.module.scss";
import {
  deleteTodo,
  toggleTodoCompletion,
} from "../../../../redux/slices/userSlice";
import { useUser } from "../../../../helpers";
import { useParams } from "react-router-dom";
import { Icon } from "../../../Icon/Icon";

import trashIcon from "../../../../assets/icon/trash.png";

export const ToDoItem = ({ title, completed, todoId }) => {
  const dispatch = useDispatch();
  const user = useUser();
  const { id: projectId } = useParams();

  const handleCheckboxChange = () => {
    dispatch(toggleTodoCompletion({ user, projectId, todoId }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ user, projectId, todoId }));
  };
  return (
    <div className={styles.ToDoItem}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      <div className={completed ? styles.completed : styles.notCompleted}>
        {title}
      </div>
      <Icon
        src={trashIcon}
        className={styles.todoTrashIcon}
        onClick={handleDelete}
        trashIcon={true}
      />
    </div>
  );
};
