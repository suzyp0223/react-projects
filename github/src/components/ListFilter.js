import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./ListFilter.module.css";

import Modal from "./Modal";
import { GITHUB_API } from "../api";

// 탭 컴포넌트
export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);

  const filterList = ["Labels", "Milestones", "Assignees", "Issues"];

  // 데이터 가공 name, title, login -> name
  async function getData(apiPath) {
    const data = await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`,
    );
    // console.log({ data });

    let result = [];
    switch (apiPath) {
      case "assignees":
        result = data.data.map((d) => ({
          name: d.login,
        }));
        break;
      case "milestones":
        result = data.data.map((d) => ({
          name: d.title,
        }));
        break;
      case "issues":
        result = data.data.flatMap((d) =>
          d.labels.map((label) => ({
            name: label.name,
            color: label.color,
          })),
        );
        break;
      case "labels":
      default:
        result = data.data;
    }
    // console.log("result", result);
    setList(result);
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}`;
      getData(apiPath);
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.filterLists}>
        {/* // 1번모달 열린 상태에서 2번모달 열렸을때 1번 꺼지게 변경 -> */}

        {filterList.map((filter) => (
          <ListFilterItem
            key={filter}
            searchDataList={list}
            onClick={() => setShowModal(filter)}
            onClose={() => setShowModal(null)}
            showModal={showModal === filter}
            onChangeFilter={onChangeFilter}
          >
            {filter}
          </ListFilterItem>
        ))}
        {/* <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignees</ListFilterItem>
        <ListFilterItem>Sort</ListFilterItem> */}
      </div>
    </>
  );
}

//children은 태그를 여는 것 처럼 사용 가능. 모달컴포넌트
function ListFilterItem({
  children,
  placeholder,
  searchDataList,
  showModal,
  onClick,
  onClose,
  onChangeFilter,
}) {
  // 스테이트가 각각 모달마다 있어서 모달6개다 한번에 열림.
  // const [showModal, setShowModal] = useState(false);
  // 1번모달 열린 상태에서 2번모달 열렸을때 1번 꺼지게 변경 -> showModal스테이트를 ListFilter함수로 이동.

  const [list, setList] = useState(searchDataList); /** data */
  /**
    프롭스가 변하면 list 스테이트도 변하기 때문에
    useEffect문에 디펜던시(의존성)을 지정한다.
    searchDataList를 디펜던시로 등록한다.
  */
  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);

  return (
    <>
      <div className={styles.filterItem}>
        <span role="button" onClick={onClick}>
          {children} ▾
        </span>
        <div className={styles.modalContainer}>
          <Modal
            title={children}
            opened={showModal}
            onClose={onClose} // 부모에서 showModal을 null로 설정
            placeholder={placeholder}
            searchDataList={list} // list는 API 결과가 들어감
            onClickCell={(params) => {
              // onClickCell={(cellInfo) => {
              // 클릭된 정보를 통해 리스트 필터링
              // const data = getData('필터링 된 정보');
              onChangeFilter(params);
            }}
          />
        </div>
      </div>
    </>
  );
}
