import { forwardRef } from 'react';
import cx from 'clsx';

import styles from './TextField.module.css';

const TextField = forwardRef(function TextField(
  { type = 'input', name, placeholder, onChange, value, error },
  ref,
) {
  // console.log('error: ', {error});
  return type === 'input' ? (
    <input
      onChange={onChange}
      value={value}
      name={name}
      ref={ref}
      className={cx(styles.input, styles.border, {
        [styles.error]: Boolean(error),
      })}
      placeholder={placeholder}
    />
  ) : (
    <textarea
      onChange={onChange}
      value={value}
      name={name}
      ref={ref}
      className={cx(styles.textarea, styles.input)}
      placeholder={placeholder}
    ></textarea>
  );
});

// 함수형 컴포넌트 새로만들었을때 ref로 감싸서 전달하고 싶으면 이렇게 작성.
export default TextField;
c: \Users\Pack\Desktop\react - projects - 복사본\github\src\context