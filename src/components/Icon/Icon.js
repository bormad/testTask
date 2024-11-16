import styles from "./Icon.module.scss";

export const Icon = ({ src, alt, onClick, miniIcon }) => {
  return (
    <img
      className={`${styles.Icon} ${miniIcon ? styles.miniIcon : ""}`}
      onClick={onClick}
      src={src}
      alt={alt}
    />
  );
};
