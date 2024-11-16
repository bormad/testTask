import styles from "./Project.module.scss";

export const Project = ({ projectName }) => {
  const onClickProject = () => {};

  return (
    <div className={styles.Project} onClick={onClickProject}>
      {projectName} <div>{">"}</div>
    </div>
  );
};
