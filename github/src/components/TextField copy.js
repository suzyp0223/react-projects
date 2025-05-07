// 중복되는 코드 수정
import React, { forwardRef } from "react";
import cx from "clsx";
import styles from "./TextField.module.css";

// forwardRef로 ref를 외부에서 연결 가능하게
const TextField = forwardRef(function TextField(
  {
    type = "text", // 기본은 input
    name,
    placeholder,
    value,
    onChange,
    error,
    ...rest
  },
  ref,
) {
  const sharedProps = {
    name,
    placeholder,
    value,
    onChange,
    ref,
    className: cx(styles.input, { [styles.error]: !!error }),
    ...rest,
  };

  return (
    <div className={styles.wrapper}>
      {type === "textarea" ? (
        <textarea {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      {error && <div className={styles.errorMsg}>{error}</div>}
    </div>
  );
});

export default TextField;
