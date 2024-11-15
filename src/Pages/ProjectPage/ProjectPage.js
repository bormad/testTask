import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../helpers";
import styles from "./ProjectPage.module.scss";
import { useForm } from "react-hook-form";
import { Button, Input, ToDoList, ToDoItem } from "../../components";
import { useDispatch } from "react-redux";
import { addTodoToProject, deleteProject } from "../../redux/slices/userSlice";

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
  const navigate = useNavigate();

  const project = user.projects.find((proj) => proj.id === Number(projectId));

  const onSubmit = ({ title }) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    dispatch(addTodoToProject({ user, projectId, todo: newTodo }));

    reset();
  };

  const handleDelete = () => {
    dispatch(deleteProject({ user, projectId }));
    navigate("/main");
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

      <ToDoList>
        {project.todos.map(({ title, completed, id }) => (
          <ToDoItem key={id} title={title} completed={completed} todoId={id} />
        ))}
      </ToDoList>

      <Button onClick={handleDelete} className={styles.DeleteBtn}>
        Удалить проект
      </Button>
    </div>
  );
};
