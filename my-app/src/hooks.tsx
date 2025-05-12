/*
  스테이트를 커스텀훅으로 변경하는 방법
*/
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { GITHUB_API } from './api';

// Generic 제네릭
interface UseFormProps {
  initialValues: Record<string, string>;
  validate: (value: Record<string, string>) => Record<string, string>;
  refs: Record<string, React.MutableRefObject<HTMLInputElement>>;
  onSuccess: (result: string) => void;
  onErrors: (validationResult?: Record<string, string>) => void;
  onSubmit: (values: Record<string, string>) => Promise<string>; // 리턴타입 Promise<string>
}

const useForm = ({
  initialValues,
  validate,
  refs,
  onSuccess,
  onErrors,
  onSubmit,
}: UseFormProps) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false); // submit 중복 제출 방지

  const resetForm = () => {
    setInputValues(initialValues);

    if (refs?.title?.current) {
      refs.title.current.focus();
    }
  };

  const onChange = async (
    e: React.ChangeEvent<{ name: string; value: string }>,
  ) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      // ref control
      setIsSubmitting(false);
      return;
    }

    // 유효성 통과
    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit(inputValues);
        onSuccess(result);
      } catch (error) {
        console.log('제출 중 오류 발생', error);
        onErrors();
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
      'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  return data.data;
}

export const useUser = () => {
  /* useUser 개선이유
    1. user 정보는 매번 바뀌지 않는다.
    2. 그럼에도, useUser 사용할때마다 네트워크 콜이 일어난다.
  */

  return useQuery(['userInfo'], () => getUserInfo());
};

/**
 * userInfo  라는 쿼리키로 캐싱 -> fetch -> stale -> 인스턴스 unmount
 *
 */
