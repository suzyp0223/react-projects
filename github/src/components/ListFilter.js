import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./ListFilter.module.css";

import Modal from "./Modal";
import { GITHUB_API } from "../api";

// 탭 컴포넌트
export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const filterList = [
    // "Author",
    "Labels",
    // "Projects",
    "Milestones",
    "Assignees",
  ];

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
      case "labels":
      default:
        result = data.data;
    }
    // console.log("result", result);
    // 데이터 가공 name, title, login -> name
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
            onClose={() => setShowModal()}
            showModal={showModal === filter}
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
            onClose={onClose}
            placeholder={placeholder}
            // searchDataList={[
            //   { name: "bug" },
            //   { name: "action" },
            //   { name: "report" },
            //   { name: "labels" },
            // ]}
            searchDataList={list}
            onClickCell={(cellInfo) => {
              // 클릭된 정보를 통해 리스트 필터링
              // onChangeFilter(data);
            }}
          />
        </div>
      </div>
    </>
  );
}
