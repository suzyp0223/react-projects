import React from 'react';
import styles from './Button.module.css';

// type Props = {
//   style: React.CSSProperties;
//   children: React.ReactElement;
//   type: 'button' | 'submit';
//   disabled: boolean;
// };
interface Props {
  style: React.CSSProperties;
  children: React.ReactElement;
  type: 'button' | 'submit';
  disabled: boolean;
}

function Button({
  style,
  children,
  type = 'button',
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={styles.button}
      style={style}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
