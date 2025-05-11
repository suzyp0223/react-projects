import styles from './Button.module.css';

function Button({ style, children, type = 'button', disabled, onClick }) {
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
