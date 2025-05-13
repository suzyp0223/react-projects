import axios from 'axios';
import { useState, useEffect } from 'react';

// 페이지네이션 쿼리로 페이지숫자표시 훅:useSearchParams
import { useSearchParams, Link } from 'react-router-dom'; // 쿼리스트링 파싱 + 주소이동

import styles from './ListContainer.module.css';

import Button from './components/Button';
import ListItem from './components/ListItem';
import ListItemLayout from './components/ListItemLayout';
import OpenClosedFilters from './components/OpenClosedFilters';
import Pagination from './components/Pagination';
import ListFilter from './components/ListFilter';
import CloseIssue from './pages/CloseIssue';
import { GITHUB_API } from './api';
import { ListItemData, STATE } from './model/issues';

interface IssueData {
  id: number;
  state: STATE.OPEN | STATE.CLOSE;
  created_at: string;
  closed_at: string;
  title: string;
  number: number;
  user: { login: string };
  labels: { name: string; color: string }[];
}

function ListContainer() {
  // 리액트에서 input을 다룰땐 useState로 많이 다룸.
  const [inputValue, setInputValue] = useState('is:pr is:open'); // ❗❗ 검색창 value
  const [checked, setChecked] = useState(false); // ❗❗체크박스 상태
  const [list, setList] = useState<ListItemData[]>([]); /* data */ // ❗❗이슈 리스트 상태

  const maxPage = 10; // ❗❗페이지네이션 최대 페이지
  const [searchParams, setSearchParams] = useSearchParams(); // ❗❗ URL 쿼리스트링 상태 관리 훅
  const page = parseInt(searchParams.get('page') ?? '1', 10); // ❗❗현재 페이지 번호
  const state = searchParams.get('state'); // ❗❗ 이슈 상태(open/closed)

  // pageParam: getData할때 page스테이트를 외부에서 받음 useEffect에서 page를 인자로 받아야함.
  // ✅ GitHub 이슈 목록 요청
  async function getData(params: any, forceRefresh = false) {
    // async function getData(params) {
    // console.log("📡 getData 호출됨 with params:", params); // ✅ 추가

    const query = new URLSearchParams(params); // ❗❗객체를 쿼리스트링처럼 다룸

    /* 🏷️
        오류상황- 이슈닫기를 누르면 무반응(작업중인 리스트는 그대로 깃헙은 이슈닫기됨)
        => query.set("state", "open") 코드 추가후 파라미터 강제 유지,
        이유3 코드 추가후 getDate()가 최신 리스트로 덮어씌어짐.
        🏷️오류가 해결된 이유1.
          ❗❗쿼리 파라미터가 ?state=open이 아닌 경우 GitHub API는 닫힌 이슈도 함께 보내줍니다.
          ❗❗기본값을 open으로 지정하여 리스트가 닫힌 이슈 없이 유지되도록 했습니다.
        */
    if (!query.has('state')) query.set('state', 'open'); // 🔒 state 값 기본값 강제 설정❗❗
    // console.log("📡 getData 호출됨 with params:", query.toString());

    // 🔄 캐시 우회용 타임스탬프 파라미터 (옵션)
    // ❗ 조건부로만 캐시 방지 쿼리 추가
    if (forceRefresh) {
      query.set('t', Date.now().toString()); // 캐시 무효화
    }

    const { data } = await axios.get(
      `${GITHUB_API}/repos/suzyp0223/react-projects/issues`,

      {
        params: Object.fromEntries(query.entries()), // ❗❗query -> 객체 변환

        /* 🏷️오류가 해결된 이유2.
          ❗❗이 코드가 없으면 GitHub API는 403 오류를 반환.
          ❗❗추가한 후 axios.get() 요청이 인증되어 데이터를 정상적으로 가져올 수 있게됨.
        */
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    // console.log("📦 최신 리스트 데이터:", data); // 👈 여기 확인!
    // ❗❗ 받은 이슈 중에서 open인 것만 화면에 보여줌
    /* 🏷️오류가 해결된 이유3.
      ❗❗GitHub API는 state=open을 줘도 종종 캐시된 데이터에서 closed 이슈를 줄 수 있습니다.
      ❗❗이 코드를 통해 화면에 정확히 열린 이슈만 보여지게 만들었습니다.
    */
    setList(data.filter((item: any) => item.state === 'open'));
  }

  // 유저가 볼수있는 화면이 그려지고난 후에 useEffect 훅이 작동(getData()작동)
  // useEffect 디펜던시[ ]에서 page를 인자로 받아야[page]
  // 페이지가 바뀔때마다 getDate가 불려짐.
  useEffect(() => {
    // open 기본값 설정
    // ✅ 컴포넌트 마운트 시 / searchParams 변경 시 이슈 다시 가져오기❗❗
    if (!searchParams.get('state')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('state', 'open');
      setSearchParams(newParams); // ❗❗변경 시 자동으로  getData트리거
      return;
    }
    getData(searchParams);
  }, [searchParams]);

  return (
    <>
      <div className={styles.listContainer}>
        {/* ❗❗ 상단: 검색 + New Issue 버튼 */}
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link to='/new' className={styles.link}>
            <Button
              style={{
                fontSize: '14px',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              New Issue
            </Button>
          </Link>
        </div>

        {/* ❗❗상태 필터 (Open / Closed) */}
        <OpenClosedFilters
          isOpenMode={state !== 'closed'}
          onClickMode={(mode) => setSearchParams({ mode })}
        />

        {/* ❗❗필터 UI 및 리스트 */}
        <div className={styles.container}>
          <ListItemLayout className={styles.listFilter}>
            <ListFilter
              onChangeFilter={(params) => {
                const newParams = new URLSearchParams(searchParams);
                Object.entries(params).forEach(([key, value]) => {
                  newParams.set(key, value);
                });
                setSearchParams(params);
              }}
            />
          </ListItemLayout>

          {/* ❗❗ 리스트 렌더링 */}
          {Array.isArray(list) &&
            list.map((item) => {
              return (
                <ListItem
                  className={styles.listItem}
                  data={item}
                  key={item.id}
                  checked={checked}
                  onClickCheckBox={() => setChecked((prev) => !prev)}
                >
                  {/* ❗❗열려있는 이슈일 경우만 Close 버튼 노출 */}
                  {item.state === 'open' && (
                    <CloseIssue
                      issueNumber={item.number}
                      // ✅ 리스트 새로고침
                      onSuccess={() => {
                        setTimeout(() => {
                          const newParams = new URLSearchParams(searchParams);
                          newParams.set('state', 'open'); // ❗❗ 상태 유지
                          getData(newParams, true); // delay 추가
                        }, 300); // 0.3초 지연 후 호출
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        {/* ❗❗ 페이지네이션 */}
        <Pagination
          maxPage={maxPage}
          currentPage={page}
          onClickPageButton={(PageNumber) =>
            setSearchParams({ page: PageNumber.toString() })
          }
        />
      </div>
    </>
  );
}

export default ListContainer;
