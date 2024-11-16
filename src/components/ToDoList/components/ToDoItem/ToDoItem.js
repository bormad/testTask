import { useDispatch } from "react-redux";
import styles from "./ToDoItem.module.scss";
import {
  deleteTodo,
  editTodoToServer,
  toggleTodoCompletion,
} from "../../../../redux/slices/userSlice";
import { useUser } from "../../../../helpers";
import { useParams } from "react-router-dom";
import { Icon } from "../../../Icon/Icon";

import trashIcon from "../../../../assets/icon/trash.png";
import editIcon from "../../../../assets/icon/editIcon.png";
import { useState } from "react";
import { Button } from "../../../Button/Button";
import { Input } from "../../../Input/Input";

export const ToDoItem = ({ title, completed, todoId }) => {
  const dispatch = useDispatch();
  const user = useUser();
  const { id: projectId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleCheckboxChange = () => {
    dispatch(toggleTodoCompletion({ user, projectId, todoId }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ user, projectId, todoId }));
  };

  const handleEditToDo = () => {
    dispatch(editTodoToServer({ user, projectId, todoId, newTitle }));
    setIsEditing(false);
  };

  return (
    <li className={styles.ToDoItem}>
      <div className={styles.wrapper}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
        />
        {isEditing ? (
          <div className={styles.editToDo}>
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleEditToDo}>Сохранить</Button>
            <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          </div>
        ) : (
          <div className={completed ? styles.completed : styles.notCompleted}>
            {title}
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        <Icon
          src={editIcon}
          miniIcon={true}
          onClick={() => setIsEditing(true)}
        />
        <Icon src={trashIcon} onClick={handleDelete} miniIcon={true} />
      </div>
    </li>
  );
};
