import styles from "./Button.module.css";

export default function Button({
  style,
  children,
  type = "button",
  disabled,
  onClick,
}) {
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
