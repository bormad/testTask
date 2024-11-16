import styles from "./Pagination.module.scss";
import { Button } from "../../../components";
export const Pagination = ({ page, setPage, lastPage }) => {
  return (
    <div className={styles.Pagination}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        Предыдущая
      </Button>
      <div className={styles.currentPage}>Текущая страница {page}</div>
      <Button
        disabled={page === lastPage}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Слудующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};
