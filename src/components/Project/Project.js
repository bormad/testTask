import styles from "./Project.module.scss";

export const Project = ({ projectName, id }) => {
  const onClickProject = () => {};
  return (
    <div className={styles.Project} onClick={onClickProject}>
      {projectName}
    </div>
  );
};
