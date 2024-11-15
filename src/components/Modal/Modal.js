import { useForm } from "react-hook-form";
import { closeModal } from "../../redux/slices/modalSlice";
import styles from "./Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { addProjectToServer } from "../../redux/slices/userSlice";
import { useUser } from "../../helpers";
export const Modal = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });
  const modalIsOpen = useSelector((state) => state.modalSlice.isOpen);
  const dispatch = useDispatch();
  const user = useUser();

  const onSubmit = async ({ title }) => {
    const newProject = {
      id: Date.now(),
      name: title,
      todos: [],
    };
    dispatch(addProjectToServer({ user, project: newProject }));
    reset();
    dispatch(closeModal());
  };

  return (
    <div className={`${styles.Modal} ${modalIsOpen ? "" : styles.close}`}>
      <div>Добавить проект</div>
      <div className={styles.closeBtn} onClick={() => dispatch(closeModal())}>
        X
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Название проекта"
          {...register("title")}
        />
        <Button type="submit">Создать проект</Button>
      </form>
    </div>
  );
};
