import { useState, useEffect, useRef } from "react";
import cx from "clsx";

import styles from "./Modal.module.css";

// 필터링데이터, 커스터마이징테이터 프롭스로 받음-searchDataList
const Modal = ({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,

}) => {
  // 필터링된 데이터상태- 원천데이터가 있어야해서 searchDataList가 초기값
  const [filteredData, setFilteredData] = useState(searchDataList);
  const [searchValue, setSearchValue] = useState("");

  // // useState 작동 확인
  // useEffect(() => {
  //   console.log("searchValue", { searchValue });
  // }, [searchValue]);

  /*
    원천데이터인 searchDataList를 가공해서 필터링.
  */
  useEffect(() => {
    //item.some("...")=> 일치하는걸 필터링함.
    // setFilteredData(searchDataList.filter((item) => item.some("...")));
    if (searchValue === "") {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      // setFilteredData(searchDataList.filter((item) => item === searchValue));
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, searchValue]);


  // 모달 외부 클릭시 모달종료
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // 바깥 클릭시 모달 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!opened) return null;


  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header} ref={modalRef}>
        <span>Filter by {title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {/* 맵을 통해 순회하여 원하는 컴포넌트로 그려줌 */}
        {Array.isArray(filteredData) &&
          filteredData.map((data, index) => (
            <div
              onClick={() => {
                const isLabel = title.toLowerCase() === "labels";
                const paramKey = isLabel ? "labels" : title.toLowerCase();

                // 변수를 키에 넣으려면 []로 묶는다.
                onClickCell({ [paramKey]: data.name });
              }}
              className={styles.item}
              key={`${data.name}-${index}`}
            >
              {data.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Modal;
