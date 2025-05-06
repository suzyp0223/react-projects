import { useRef } from "react";

import cx from "clsx";

import Button from "./../components/Button";
import styles from "./CreateIssue.module.css";

const CreateIssue = () => {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if(e.target.elements.title.value === '') {
      alert('타이틀을 입력해주세요');
      ref.current.focus();
    }
    // console.log("e", e);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log("제출된 데이터:", data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            ref={ref}
            className={cx(styles.input, styles.border)}
            placeholder="Title"
          />
          <textarea
            id="body"
            name="body"
            className={cx(styles.textarea, styles.input)}
            placeholder="Leave Comment"
          ></textarea>
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              style={{
                fontSize: "14px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Submit new Issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;
