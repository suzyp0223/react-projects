import {useState} from "react";

import styles from "./ListFilter.module.css";

import Modal from "./Modal";

// 탭 컴포넌트
export default function ListFilter( ) {
  return (
    <>
      <div className={styles.filterLists}>
        <ListFilterItem>Author</ListFilterItem>
        <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignees</ListFilterItem>
        <ListFilterItem>Sort</ListFilterItem>
      </div>
    </>
  );
}


//children은 태그를 여는 것 처럼 사용 가능. 모달컴포넌트
function ListFilterItem({ children, onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.filterItem}>
        <span role="button" onClick={() => setShowModal(true)}>
          {children}▾
        </span>
        <div className={styles.modalContainer}>
          <Modal
            opened={showModal}
            onClose={() => setShowModal(false)}
            placeholder="Filter labels"
            searchDataList={["bug", "action", "report", "labels"]}
            onClickCell={() => {
              // 클릭된 정보를 통해 리스트 필터링
              onChangeFilter();
            }}
          />
        </div>
      </div>
    </>
  );
}