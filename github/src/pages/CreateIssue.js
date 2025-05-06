import { useRef, useState, useEffect } from "react";

import cx from "clsx";
import styles from "./CreateIssue.module.css";

import Button from "../components/Button";
import TextField from "../components/TextField";

const CreateIssue = () => {
  // form 똑똑하게 다루는 방법: useRef()
  const inputRef = useRef();
  const textareaRef = useRef();
  const [inputValues, setInputValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({});

  //여러번 submit 버튼 클릭되는걸 방지하는 스테이트
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    const validateResult = validate(inputValues);
    setErrors(validateResult);

    const refs = {title: inputRef, body:textareaRef};
    const errorKeys = Object.keys(validateResult); //[]

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(validateResult[key]);
      refs[key].current.focus();

      //ref control
      setIsSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      console.log("Submit 성공");
    }

    // if (e.target.elements.title.value === "") {
    //   alert("타이틀을 입력해주세요");
    //   ref.current.focus();
    // }
    // console.log("e", e);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log("제출된 데이터:", data);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  // useEffect(() => {
  //   console.log("setInputValues:", setInputValues);
  // }, [setInputValues]);

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
            vale={inputValues.title}
            onChange={onChange}
            error={errors.title}
          />
          <TextField
            type="textarea"
            ref={textareaRef}
            name="body"
            placeholder="Leave comment"
            vale={inputValues.body}
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
              disabled={isSubmitting }
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
