import { useForm } from "react-hook-form";
import { closeModal } from "../../redux/slices/modalSlice";
import styles from "./Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import {
  addProjectToServer,
  editProjectToServer,
} from "../../redux/slices/userSlice";
import { useUser } from "../../helpers";

export const Modal = () => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const {
    isOpen,
    modalType,
    id: projectId,
  } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();
  const user = useUser();
  const onSubmit = async ({ title }) => {
    if (modalType === "createProject") {
      const newProject = {
        id: Date.now(),
        name: title,
        todos: [],
      };
      dispatch(addProjectToServer({ user, project: newProject }));
    }

    if (modalType === "editProject") {
      const updatedProjectData = {
        name: title,
      };
      dispatch(editProjectToServer({ user, projectId, updatedProjectData }));
    }

    reset();
    dispatch(closeModal());
  };

  return (
    <div className={`${styles.Modal} ${isOpen ? "" : styles.close}`}>
      <div>
        {modalType === "editProject" ? "Редактировать" : "Добавить"} проект
      </div>
      <div className={styles.closeBtn} onClick={() => dispatch(closeModal())}>
        X
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Название проекта"
          {...register("title")}
        />
        <Button type="submit">
          {modalType === "editProject" ? "Редактировать" : "Добавить"} проект
        </Button>
      </form>
    </div>
  );
};
