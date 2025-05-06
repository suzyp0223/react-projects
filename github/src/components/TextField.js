import { forwardRef } from "react";
import cx from "clsx";

import styles from "./TextField.module.css";

const TextField = ({ type = "input", name, placeholder }, ref) => {
  return type === "input" ? (
    <input
      name={name}
      className={cx(styles.input, styles.border)}
      placeholder={placeholder}
    />
  ) : (
    <textarea
      name={name}
      className={cx(styles.textarea, styles.input)}
      placeholder={placeholder}
    ></textarea>
  );
};

// 함수형 컴포넌트 새로만들었을때 ref로 감싸서 전달하고 싶으면 이렇게 작성.
export default forwardRef(TextField);
