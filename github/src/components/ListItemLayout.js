import cx from "clsx";
import styles from "./ListItemLayout.module.css";

const ListItemLayout = ({ children, className }) => {
  return (
    // 이중 클래스네임 - cx:클래스네임 두개를 한번에 묶기
    <div className={cx(styles.wrapper, className)}>
      <input
        type="checkbox"
        className={styles.checkbox}
        // value={checked}
        // onChange={onChangeCheckBox}
      />
      {children}
    </div>
  );
};

export default ListItemLayout;
