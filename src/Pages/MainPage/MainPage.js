import { MyLink } from "../../components";
import { Project } from "../../components/Project/Project";
import { useUser } from "../../helpers";
import styles from "./MainPage.module.scss";

export const MainPage = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.MainPage}>
      {user.projects.map(({ name, id, todos }) => (
        <MyLink key={id} to={`/project/${id}`}>
          <Project projectName={name} id={id} todos={todos} />
        </MyLink>
      ))}
    </div>
  );
};
