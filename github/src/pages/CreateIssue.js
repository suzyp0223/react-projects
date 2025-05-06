import { useRef } from "react";
import cx from "clsx";

import styles from "./CreateIssue.module.css";

import Button from "../components/Button";
import TextField from "../components/TextField";
import useForm from "../hooks";

const CreateIssue = () => {
  // form 똑똑하게 다루는 방법: useRef()
  const inputRef = useRef();
  const textareaRef = useRef();

  const { isSubmitting, inputValues, onChange, handleSubmit, errors } = useForm(
    {
      initialValues: { title: "", body: "" },
      onSubmit: () => console.log("완료"),
      onErrors: () => console.warn("유효성 검사 실패!"),
      validate,
      refs: { title: inputRef, body: textareaRef },
    },
  );

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
          <TextField
            ref={inputRef}
            name="title"
            placeholder="Title"
            value={inputValues.title}
            onChange={onChange}
            error={errors.title}
          />
          <TextField
            type="textarea"
            ref={textareaRef}
            name="body"
            placeholder="Leave comment"
            value={inputValues.body}
            onChange={onChange}
            error={errors.body}
          />
          <div className={styles.buttonWrapper}>
            <Button
              type="submit"
              style={{
                fontSize: "14px",
                backgroundColor: "green",
                color: "white",
                marginTop: "5px",
              }}
              disabled={isSubmitting}
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

function validate(value) {
  let errors = {};
  if (value.title === "") {
    errors = { title: "타이틀은 필수값입니다." };
  } else if (value.body === "") {
    errors = { body: "내용을 작성해 주세요" };
  }
  return errors;
}
