import { useParams } from "react-router-dom";
import { useUser } from "../../helpers";
import styles from "./ProjectPage.module.scss";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { useDispatch } from "react-redux";
import { addTodoToProject } from "../../redux/slices/userSlice";

export const ProjectPage = () => {
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
  const user = useUser();
  const { id: projectId } = useParams();
  const dispatch = useDispatch();

  const project = user.projects.find((proj) => proj.id === Number(projectId));

  const onSubmit = ({ title }) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    dispatch(addTodoToProject({ userId: user.id, projectId, todo: newTodo }));

    reset();
  };
  return (
    <div className={styles.ProjectPage}>
      <h1>{project.name}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Название нового дела"
          {...register("title", { required: "Это поле обязательно" })}
        />
        <Button type="submit">Добавить дело</Button>
      </form>
    </div>
  );
};
