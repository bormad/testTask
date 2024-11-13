import styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  return (
    <div className={styles.ErrorPage}>
      <h1>Упс... Такой страницы не существует</h1>
    </div>
  );
};
