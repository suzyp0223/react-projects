import { useState } from "react";
import styles from "./Tabs.module.css";

// clsx => 복합적인 클래스네임쓸때 유용한 라이브러리.
import cx from "clsx";

// {/* //  Tab이 여러개 반복될때 tabList데이터로 만들어서 map으로 순회. */}
const tabList = ["Code", "Issues", "Pull Request"];

export default function Tabs() {
  // 선택된 탭의 인덱스를 저장하는 상태.
  // 탭 클릭 시 어떤 탭이 선택됐는지를 추적하기 위해 useState를 사용.
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  return (
    <ul className={styles.tabList}>
      {tabList.map((tab, idx) => (
        <Tab
          key={`${idx}`}
          title={tab}
          selected={selectedTabIdx === idx}
          onClick={() => setSelectedTabIdx(idx)}
        />
      ))}
    </ul>
  );
}

function Tab({ title, selected, onClick, number }) {
  return (
    <li>
      <button
        onClick={onClick}

        // { selected 됐을때만 selected가 들어간다 }는 뜻.
        className={cx(styles.tab, { [styles.selected]: selected })}
      >
        <span>{title}</span>
        {/* number && => number가 있을때만 표현 */}
        {number && <div className={styles.circle}>{number}</div>}
      </button>
    </li>
  );
}
