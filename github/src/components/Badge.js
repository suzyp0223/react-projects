import styles from "./Badge.module.css";

// 매개변수color를 클래스 네임으로 쓰기위해 clsx를 추가
import cx from "clsx";

// badge커스터마이징하기 위해 color프롭을 추가. styles[]대괄호 안에 변수를 쓸수 있음.
const Badge = ({ title, color }) => {
  return <span className={cx(styles.badge, styles[color])}>{title}</span>;
};

export default Badge;
