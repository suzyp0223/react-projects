import styles from "./CreateIssue.module.css";

import cx from "clsx";
import Button from "./../components/Button";

const CreateIssue = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <input
          className={cx(styles.input, styles.border)}
          placeholder="Title"
        />
        <textarea
          className={cx(styles.textarea, styles.input)}
          placeholder="Leave Comment"
        ></textarea>
        <div className={styles.buttonWrapper}>
          <Button
            style={{
              fontSize: "14px",
              backgroundColor: "green",
              color: "white",
            }}
            Submit
            new
            issue
          >Submit new Issue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateIssue;
