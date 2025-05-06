import { useState } from "react";

// url의 pathname을 받아오는 훅: useLocation
// history api를 통해서 브라우저 경로만 바꾸는 컴포넌트: Link(a태그를 내부적으로 사용)
import { useLocation, Link } from "react-router-dom";

// clsx => 복합적인 클래스네임쓸때 유용한 라이브러리.
import cx from "clsx";
import styles from "./Tabs.module.css";

// {/* //  Tab이 여러개 반복될때 tabList데이터로 만들어서 map으로 순회. */}
const TabList = [
  { name: "Code", pathname: "/path" },
  { name: "Issues", pathname: "/issue" },
  { name: "Pull Request", pathname: "/pulls" },
  { name: "Actions", pathname: "/actions" },
  { name: "Projects", pathname: "/projects" },
  { name: "Security", pathname: "/security" },
];

export default function Tabs() {
  // 선택된 탭의 인덱스를 저장하는 상태.
  // 탭 클릭 시 어떤 탭이 선택됐는지를 추적하기 위해 useState를 사용.
  // const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  // url의 pathname을 받아오는 훅: useLocation
  const { pathname } = useLocation();
  // const data = useLocation();
  // console.log("{data}: ", { data });

  return (
    <ul className={styles.tabList}>
      {TabList.map((tab, idx) => (
        <Tab
          key={`${idx}`}
          item={tab}
          //  onClick={() => setSelectedTabIdx(idx)} //Link컴포넌트를사용하면 없어도 됨
          selected={(pathname === "/" ? "/issue" : pathname) === tab.pathname} // index.js ('/') path도 /issues도 issues 탭선택.
        />
      ))}
    </ul>
  );
}

function Tab({ item, selected, number }) {
  return (
    <li>
      <Link to={item.pathname} className={styles.link}>
        <button
          // { selected 됐을때만 selected가 들어간다 }는 뜻.
          className={cx(styles.tab, { [styles.selected]: selected })}
        >
          <span>{item.name}</span>
          {/* number && => number가 있을때만 표현 */}
          {number && <div className={styles.circle}>{number}</div>}
        </button>
      </Link>
    </li>
  );
}
