import styles from "./ListItem.module.css";
import ListItemLayout from "./ListItemLayout";
import Badge from "./Badge";

const ListItem = ({ checked, onChangeCheckBox, onClickTitle, badges,data }) => {
  return (
    <ListItemLayout>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {/* badges가 있을때만 씀. */}
          {badges &&
            badges.map((badgeProps, idx) => (
              // <Badge key={idx} title="Bug" color="red" /> 타이틀내용을 벳지를 쓸곳, ListContainer에서 작성함
              <Badge key={`${idx}`} {...badgeProps} />
            ))}
        </div>
        <div className={styles.description}>#Description</div>
      </div>
    </ListItemLayout>
  );
};

export default ListItem;
