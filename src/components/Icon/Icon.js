import styles from "./Icon.module.scss";

export const Icon = ({ src, alt, onClick, trashIcon }) => {
  return (
    <img
      className={`${styles.Icon} ${trashIcon ? styles.trashIcon : ""}`}
      onClick={onClick}
      src={src}
      alt={alt}
    />
  );
};
