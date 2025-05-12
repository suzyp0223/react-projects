import React from 'react';
import styles from './Button.module.css';

// type ButtonProps = {
//   style: React.CSSProperties;
//   children: React.ReactElement;
//   type: 'button' | 'submit';
//   disabled: boolean;
// };
interface ButtonProps {
  style: React.CSSProperties;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  style,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
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
