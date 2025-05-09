import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import cx from "clsx";
import styles from "./CreateIssue.module.css";

import Button from "../components/Button";
import TextField from "../components/TextField";
import useForm from "../hooks";
import { GITHUB_API } from "./../api";
import UserContext from "../context/UserContext";
import { useUser } from "../hooks";

const CreateIssue = () => {
  const [successMessage, setSuccessMessage] = useState("");
  // form 똑똑하게 다루는 방법: useRef()
  const inputRef = useRef();
  const textareaRef = useRef();
  const navigate = useNavigate();
  // const data = useContext(UserContext); // user라는 값을 context에 담아서 가져옴. app.js에서 provider 에 담은 user값.
  // console.log("data: ", { data });
  const user = useUser();  // user값을 계속 보내지 않기 위해 캐시사용.
  // 캐시 - 쉽게 변하지 않는 데이터를 임시적으로 저장해두는 부분.
  // console.log('{user}: ', {user});

  const {
    isSubmitting,
    inputValues,
    onChange,
    errors,
    handleSubmit,
    resetForm,
  } = useForm({
    initialValues: { title: "", body: "" },
    onSubmit: async (formData) => {
      // console.log("토큰확인:", process.env.REACT_APP_GITHUB_TOKEN),
      try {
        const res = await axios.post(
          `${GITHUB_API}/repos/suzyp0223/react-projects/issues`,
          inputValues,
          // {
          //   // title: "Issue test",
          //   // body: "이슈 생성 테스트중",
          //   title: formData.title,
          //   body: formData.body,https://korean.visitkorea.or.kr/main/main.do
          // },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("이슈 생성 성공 ✅", res.data);
        setSuccessMessage("이슈가 성공적으로 등록되었습니다! 🎉");
        setTimeout(() => {
          setSuccessMessage("");
          resetForm();

          // 이슈생성 후 전페이지로  이동
          navigate("/", { replace: true });
          alert("이슈 생성 페이지로 이동합니다🚀");
        }, 2000);
      } catch (error) {
        console.error("이슈 생성 실패 ❌", error);
      }
    },
    onErrors: () => console.warn("유효성 검사 실패 ❌"),
    validate,
    refs: { title: inputRef, body: textareaRef },
    onSuccess: (result) => {
      console.log({ result });

      //   // 이슈생성 성공시 전페이지(이슈페이지)로  바로이동
      //   navigate("/", { replace: true });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.avatar}></div>
      <div className={cx(styles.inputWrapper, styles.border)}>
        {/* !!성공 메시지 출력 */}
        {successMessage && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            {successMessage}
          </div>
        )}

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
