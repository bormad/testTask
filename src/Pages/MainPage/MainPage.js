import { useDispatch } from "react-redux";
import { Button, H1, MyLink } from "../../components";
import { Project } from "../../components/Project/Project";
import { useUser } from "../../helpers";
import styles from "./MainPage.module.scss";
import { openModal } from "../../redux/slices/modalSlice";
import { Pagination } from "./components/Pagination";
import { useState } from "react";

export const MainPage = () => {
  const user = useUser();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const projectsPerPage = 5;
  const lastPage = Math.ceil(user.projects.length / projectsPerPage);

  const indexOfLastProject = page * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = user.projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <main className={styles.MainPage}>
      <H1>{user.projects.length > 0 ? "Ваши проекты:" : "Создайте проект"}</H1>

      <div className={styles.wrapper}>
        {currentProjects.map(({ name, id, todos }) => (
          <MyLink key={id} to={`/project/${id}`}>
            <Project projectName={name} id={id} todos={todos} />
          </MyLink>
        ))}
      </div>
      <Button
        className={styles.Sidebar__Btn}
        onClick={() => dispatch(openModal("createProject"))}
      >
        Добавить проект
      </Button>

      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </main>
  );
};
