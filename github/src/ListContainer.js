import { useState } from "react";
import styles from "./ListContainer.module.css";
import cx from "clsx";

import Button from "./components/Button";
import ListItem from "./components/ListItem";
import ListItemLayout from "./components/ListItemLayout";
import Modal from "./components/Modal";

const ListContainer = () => {
  // 리액트에서 input을 다룰땐 useState로 많이 다룸.
  const [inputValue, setInputValue] = useState("is:pr is:open");

  // 리스트 체크박스
  // const [checkedList, setCheckedList] = useState([]);

  //
  // const [isOpenMode, setIsOpenMode] = useState(true);
  // const openModeDataSize = 1;
  // const closeModeDataSize = 2;
  /*
  const data = getData();
  const openedData = data.filter((d) => d.stat === 'open');
  const closedData = data.filter((d) => d.stat === 'closed');
  */

  // useEffect(() => {
  //   console.log({ inputValue });
  // }, [inputValue]);

  return (
    <div className={styles.listContainer}>
      <div className={styles.topSection}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          style={{ fontSize: "14px", backgroundColor: "green", color: "white" }}
        >
          New Issue
        </Button>
      </div>
      <>
        {/* <span
          role="button"
          className={cx(styles.textFilter, { [styles.selected]: isOpenMode })}
          onClick={() => setIsOpenMode(true)}
        >
          {openModeDataSize}Open
        </span>
        <span
          role="button"
          className={cx(styles.textFilter, {
            [styles.selected]: !isOpenMode,
          })}
          onClick={() => setIsOpenMode(false)}
        >
          {closeModeDataSize}Closed
        </span> */}

        {/* 반복되는 코드를  컴포넌트로 분리 2*/}
        {/* <OpenClosedFilter
          size={openModeDataSize}
          state="Open"
          selected={isOpenMode}
          onClick={() => setIsOpenMode(true)}
        />
        <OpenClosedFilter
          size={closeModeDataSize}
          state="Closed"
          selected={!isOpenMode}
          onClick={() => setIsOpenMode(false)}
        /> */}
      </>

      <OpenClosedFilters />
      <ListItemLayout className={styles.listFilter}>
        <ListFilter />
      </ListItemLayout>
      <div className={styles.container}>
        <ListItem
          // checked={checkedList.filter((item) => item.id === "0")[0]}
          // onChangeCheckBox={() => {
          //   const currentChecked = checkedList.filter(
          //     (item) => item.id === "0",
          //   )[0];

          //   if (currentChecked) {
          //     // 리스트에서 빼기
          //   } else {
          //     // 리스트에 추가하기
          //   }
          //   setCheckedList((checkedList) => [...checkedList, "0"]);
          // }}
          badges={[
            {
              color: "red",
              title: "Bug2",
            },
          ]}
        />
      </div>
    </div>
  );
};

// 탭 컴포넌트
function ListFilter() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.filterLists}>
        <ListFilterItem onClick={() => setShowModal(true)}>
          Author
        </ListFilterItem>
        <ListFilterItem>Label</ListFilterItem>
        <ListFilterItem>Projects</ListFilterItem>
        <ListFilterItem>Milestones</ListFilterItem>
        <ListFilterItem>Assignees</ListFilterItem>
        <ListFilterItem>Sort</ListFilterItem>
      </div>
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        placeholder="Filter labels"
      />
    </>
  );
}

//children은 태그를 여는 것 처럼 사용 가능
function ListFilterItem({ onClick, children }) {
  return (
    <span role="button" onClick={onClick}>
      {children}▾
    </span>
  );
}

/* 반복되는 코드2를  컴포넌트로 분리 3*/
function OpenClosedFilters({ data }) {
  const [isOpenMode, setIsOpenMode] = useState(true);
  const openModeDataSize = 1;
  const closeModeDataSize = 2;

  return (
    <>
      <OpenClosedFilter
        size={openModeDataSize}
        state="Open"
        selected={isOpenMode}
        onClick={() => setIsOpenMode(true)}
      />
      <OpenClosedFilter
        size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        onClick={() => setIsOpenMode(false)}
      />
    </>
  );
}

/* 반복되는 코드를  컴포넌트로 분리 2*/
function OpenClosedFilter({ size, state, onClick, selected }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  );
}

export default ListContainer;
