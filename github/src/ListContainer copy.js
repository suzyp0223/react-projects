import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom"; // 쿼리스트링 파싱 + 주소이동

import styles from "./ListContainer.module.css";

import Button from "./components/Button";
import ListItem from "./components/ListItem";
import ListItemLayout from "./components/ListItemLayout";
import OpenClosedFilters from "./components/OpenClosedFilters";
import Pagination from "./components/Pagination";
import ListFilter from "./components/ListFilter";
import { GITHUB_API } from "./api";
import CloseIssue from "./pages/CloseIssue";

const ListContainer = () => {
  const [inputValue, setInputValue] = useState("is:pr is:open"); // 검색창 value
  const [checked, setChecked] = useState(false); // 체크박스 상태
  const [list, setList] = useState([]); // 이슈 리스트 상태
  const maxPage = 10; // 페이지네이션 최대 페이지

  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리스트링 상태 관리 훅
  const page = parseInt(searchParams.get("page") ?? "1", 10); // 현재 페이지 번호
  const state = searchParams.get("state"); // 이슈 상태(open/closed)

  // ✅ GitHub 이슈 목록 가져오기 함수
  async function getData(params) {
    console.log("\uD83D\uDCE1 getData 호출됨 with params:", params);

    const query = new URLSearchParams(params); // 객체를 쿼리스트링처럼 다룸
    if (!query.has("state")) query.set("state", "open"); // state 값 기본값 강제 설정

    const { data } = await axios.get(
      `${GITHUB_API}/repos/suzyp0223/react-projects/issues`,
      {
        params: Object.fromEntries(query.entries()), // query -> 객체 변환
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    console.log(
      "\uD83D\uDCBE 받아온 이슈 리스트:",
      data.map((d) => [d.number, d.state]),
    );

    // 받은 이슈 중에서 open인 것만 화면에 보여줌
    setList(data.filter((item) => item.state === "open"));
  }

  // ✅ 컴포넌트 마운트 시 / searchParams 변경 시 이슈 다시 가져오기
  useEffect(() => {
    if (!searchParams.get("state")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("state", "open");
      setSearchParams(newParams); // 변경 시 자동 getData 호출됨
      return;
    }
    getData(searchParams);
  }, [searchParams]);

  return (
    <>
      <div className={styles.listContainer}>
        {/* 상단: 검색 + New Issue 버튼 */}
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link to="/new" className={styles.link}>
            <Button
              style={{
                fontSize: "14px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              New Issue
            </Button>
          </Link>
        </div>

        {/* 상태 필터 (Open / Closed) */}
        <OpenClosedFilters
          isOpenMode={state !== "closed"}
          onClickMode={(mode) => setSearchParams({ mode })}
        />

        {/* 필터 UI 및 리스트 */}
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter onChangeFilter={(params) => setSearchParams(params)} />
          </ListItemLayout>

          {/* 리스트 렌더링 */}
          {Array.isArray(list) &&
            list.map((item) => (
              <ListItem
                className={styles.listItem}
                data={item}
                key={item.id}
                checked={checked}
                onChangeCheckBox={() => setChecked((prev) => !prev)}
              >
                {/* 열려있는 이슈일 경우만 Close 버튼 노출 */}
                {item.state === "open" && (
                  <CloseIssue
                    issueNumber={item.number}
                    onSuccess={() => {
                      const newParams = new URLSearchParams(searchParams);
                      newParams.set("state", "open"); // 상태 유지
                      getData(newParams); // 이슈 닫은 후 리스트 갱신
                    }}
                  />
                )}
              </ListItem>
            ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={maxPage}
          currentPage={page}
          onClickPageButton={(PageNumber) =>
            setSearchParams({ page: PageNumber })
          }
        />
      </div>
    </>
  );
};

export default ListContainer;
