import styles from "./Modal.module.css";
import cx from "clsx";

const Modal = ({ opened, title, onClose, placeholder }) => {
  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Modal;
