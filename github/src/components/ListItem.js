import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";  // 한국어 locale 가져오기

import styles from "./ListItem.module.css";

import ListItemLayout from "./ListItemLayout";
import Badge from "./Badge";

dayjs.extend(relativeTime);
dayjs.locale('ko');

const ListItem = ({
  checked,
  onChangeCheckBox,
  onClickTitle,
  // badges,
  data,
}) => {
  const badges = data.labels;
  const state = data.state === "open" ? "opened" : "closed";
  const date = data.state === "open" ? data.created_at : data.closed_at;

  return (
    <ListItemLayout>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {/* badges가 있을때만 씀. */}
          {badges.length > 0 &&
            badges.map((props, idx) => (
              // {badges &&
              //   badges.map((badgeProps, idx) => (
              // <Badge key={idx} title="Bug" color="red" /> 타이틀내용을 벳지를 쓸곳, ListContainer에서 작성함
              <Badge key={`${idx}`} {...props} />
            ))}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()} by {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
};

export default ListItem;
