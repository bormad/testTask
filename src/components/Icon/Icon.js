import styles from "./Icon.module.scss";

export const Icon = ({ src, alt, onClick }) => {
  return <img className={styles.Icon} onClick={onClick} src={src} alt={alt} />;
};
