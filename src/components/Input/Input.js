import React from "react";
import styles from "./Input.module.scss";

export const Input = React.forwardRef(({ ...props }, ref) => {
  return <input className={styles.Input} {...props} ref={ref} />;
});
