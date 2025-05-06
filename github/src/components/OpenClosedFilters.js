import cx from "clsx";

import styles from "./ListFilter.module.css";

import { useState } from "react";

/* 반복되는 코드2를  컴포넌트로 분리 3*/
export default function OpenClosedFilters({ isOpenMode, onClickMode }) {
  /**
    isOpenMode스테이트는 ListContainer.js로 옮기고(액션이 ListContainer라서 옮김) isOpenMode를 프롭으로 받음.
    const [isOpenMode, setIsOpenMode] = useState(true);
   */

  // const openModeDataSize = 1;
  // const closeModeDataSize = 2;

  return (
    <>
      <OpenClosedFilter
        // size={openModeDataSize}
        state="Open"
        selected={isOpenMode}
        // onClick={() => setIsOpenMode(true)} 온클릭함수를 onClickMode로 바꾸고
        // ListContainer.js에서 onClickMode는 {setIsOpenMode}가 되어야함.
        onClick={() => onClickMode('open')}
      />
      <OpenClosedFilter
        // size={closeModeDataSize}
        state="Closed"
        selected={!isOpenMode}
        // onClick={() => setIsOpenMode(false)}
        onClick={() => onClickMode('closed')}
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
