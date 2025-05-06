/*
  스테이트를 커스텀훅으로 변경하는 방법

*/
import { useState } from "react";

const useForm = ({
  initialValues,
  validate,
  refs,
  onSuccess = () => {}, // 성공했을때 할일?
  onErrors = () => {}, // 에러가 나면 뭐를 어떻게?
  onSubmit, // 값이 전달될때는 어떤 함수르 호출?
}) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  //여러번 submit 버튼 클릭되는걸 방지하는 스테이트
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const validateResult = validate(inputValues);
    setErrors(validateResult);

    // const refs = { title: inputRef, body: textareaRef };
    const errorKeys = Object.keys(validateResult); //[]

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(validateResult[key]);
      onErrors();
      refs[key].current.focus();

      //ref control
      setIsSubmitting(false);
      return;
    }

    if (errorKeys.length === 0) {
      onSubmit();
      return;
    }

    // if (e.target.elements.title.value === "") {
    //   alert("타이틀을 입력해주세요");
    //   ref.current.focus();
    // }
    // console.log("e", e);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log("제출된 데이터:", data);
  };

  return { inputValues, onChange, isSubmitting, errors, handleSubmit };
};

export default useForm;
