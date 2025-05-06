import axios from "axios";
import { useState, useEffect } from "react";

import styles from "./ListContainer.module.css";

import Button from "./components/Button";
import ListItem from "./components/ListItem";
import ListItemLayout from "./components/ListItemLayout";
import OpenClosedFilters from "./components/OpenClosedFilters";
import Pagination from "./components/Pagination";
import ListFilter from "./components/ListFilter";
import { GITHUB_API } from "./api";

const ListContainer = () => {
  // 리액트에서 input을 다룰땐 useState로 많이 다룸.
  const [inputValue, setInputValue] = useState("is:pr is:open");
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState([]); /* data */

  // currentPage 변경 state
  const [page, setPage] = useState(1);
  const [isOpenMode, setIsOpenMode] = useState(true);
  const [params, setParams] = useState();
  const maxPage = 10;
  // const MAX_PAGE = getData().totalCount

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

  // pageParam: getData할때 page스테이트를 외부에서 받음 useEffect에서 page를 인자로 받아야
  //
  async function getData(params) {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/facebook/react/issues`,

    // params는 객체형태로 보내야함. 약속된 키: {page}.
      // pageParam파라미터를 page:pageParam으로 넘겨줘야 페이지네이션이 됨.
      // { params: { page: pageParam, state: isOpenMode ? "open" : "closed" } },
      { params },
    );
    setList(data);
  }

  // 유저가 볼수있는 화면이 그려지고난 후에 useEffect 훅이 작동(getData()작동)
  // useEffect 디펜던시[ ]에서 page를 인자로 받아야[page]
  // 페이지가 바뀔때마다 getDate가 불려짐.
  useEffect(() => {  // ...params 파람즈객체 그대로 가져옴
    getData({ page, state: isOpenMode ? "open" : "closed", ...params });
  }, [page, isOpenMode, params]);

  // console.log({ list });

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            style={{
              fontSize: "14px",
              backgroundColor: "green",
              color: "white",
            }}
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

        <OpenClosedFilters
          isOpenMode={isOpenMode}
          onClickMode={setIsOpenMode}
        />
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(params) => {
                // 필터링된 요소에 맞게 데이터를 불러오기
                // const data = getDate("필터링된 정보");
                // setList(data);
                setParams(params);
              }}
            />
          </ListItemLayout>
          {Array.isArray(list) &&
            list.map((item) => (
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

                data={item}
                key={item.id}
                checked={checked}
                onChangeCheckBox={() => setChecked((checked) => !checked)}
                // badges={[{ color: "red", title: "Bug2" }]}
              />
            ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={maxPage}
          currentPage={page}
          onClickPageButton={(PageNumber) => setPage(PageNumber)}
        />
      </div>
    </>
  );
};

export default ListContainer;