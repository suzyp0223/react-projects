/*
  스테이트를 커스텀훅으로 변경하는 방법

*/
import { useState } from "react";
import { useQuery } from "react-query";
import { GITHUB_API } from "./api";
import axios from "axios";

const useForm = ({
  initialValues,
  validate,
  refs = {}, // optional
  onSuccess = () => {}, // 성공했을때 할일?  // ✅ 기본 빈 함수로 안전하게
  onErrors = () => {}, // 에러가 나면 뭐를 어떻게?  // ✅ 기본 빈 함수로 안전하게
  onSubmit = () => {}, // 값이 전달될때는 어떤 함수를 호출? // ✅ 폼 제출 후 호출될 콜백
}) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false); // submit 중복 제출 방지

  const resetForm = () => {
    setInputValues(initialValues);

    if (refs?.title?.current) {
      refs.title.current.focus();
    }
  };

  const onChange = async (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const validationResult = validate(inputValues);
    setErrors(validationResult);
    const errorKeys = Object.keys(validationResult);

    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      alert(validationResult[firstErrorKey]);
      if (refs[firstErrorKey]?.current) {
        refs[firstErrorKey].current.focus();
      }

      onErrors(validationResult);
      //ref control
      setIsSubmitting(false);
      return;
    }

    // 유효성 통과
    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit(inputValues);
        onSuccess(result);
      } catch (error) {
        console.log("제출 중 오류 발생", error);
      } finally {
        setIsSubmitting(false);
      }
    }

    // // 이 코드로 인해 onSubmit()이 두번 호출됨.
    // if (errorKeys.length === 0) {
    //   await onSubmit();
    //   return;
    // }

    // if (e.target.elements.title.value === "") {
    //   alert("타이틀을 입력해주세요");
    //   ref.current.focus();
    // }
    // console.log("e", e);
    // const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log("제출된 데이터:", data);
  };

  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
    resetForm,
  };
};

export default useForm;

async function getUserInfo() {
  const data = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  return data.data;
}

export const useUser = () => {
  /* useUser 개선이유
    1. user 정보는 매번 바뀌지 않는다.
    2. 그럼에도, useUser 사용할때마다 네트워크 콜이 일어난다.
  */

  return useQuery(["userInfo"], () => getUserInfo(), {
    staleTime: "Infinity",
  });
};

/**
 * userInfo  라는 쿼리키로 캐싱 -> fetch -> stale -> 인스턴스 unmount
 *
 */