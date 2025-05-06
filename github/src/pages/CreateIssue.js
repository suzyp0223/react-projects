import { useRef } from "react";

import cx from "clsx";
import styles from "./CreateIssue.module.css";

import Button from "../components/Button";
import TextField from "../components/TextField";

const CreateIssue = () => {
  // form 똑똑하게 다루는 방법: ref
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.elements.title.value === "") {
      alert("타이틀을 입력해주세요");
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
          {/* forwardRef는 input을 사용할수 없는 상황에서 쓰임. 즉 function을 커스텀하게 사용해야할 때.*/}
          {/* <input
            type="text"
            name="title"
            ref={ref}
            className={cx(styles.input, styles.border)}
            placeholder="Title"
            /> */}
          <TextField ref={ref} name="title" placeholder="Title" />
          <TextField type="textarea" name="body" placeholder="Leave comment" />
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
