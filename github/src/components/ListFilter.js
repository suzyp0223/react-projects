import { useState } from "react";

import styles from "./ListFilter.module.css";

import Modal from "./Modal";

// 탭 컴포넌트
export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);
  const filterList = [
    "Author",
    "Label",
    "Projects",
    "Milestones",
    "Assignees",
    "Sort",
  ];

  return (
    <>
      <div className={styles.filterLists}>
        {/* // 1번모달 열린 상태에서 2번모달 열렸을때 1번 꺼지게 변경 -> */}

        {Array.isArray(filterList) &&
          filterList.map((filter) => (
            <ListFilterItem
              key={filter}
              searchDataList={[]}
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

  return (
    <>
      <div className={styles.filterItem}>
        
        <span role="button" onClick={onClick}>
          {children}▾
        </span>
        <div className={styles.modalContainer}>
          <Modal
          title={children}
            opened={showModal}
            onClose={onClose}
            placeholder="Filter labels"
            searchDataList={["bug", "action", "report", "labels"]}
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
