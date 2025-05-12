import React, { useState } from 'react';

import cx from 'clsx';
import styles from './ListFilter.module.css';

interface OpenClosedFilterProps {
  state: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  // onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/* 반복되는 코드를  컴포넌트로 분리 2 */
function OpenClosedFilter({ state, onClick, selected }: OpenClosedFilterProps) {
  return (
    <span
      role='button'
      tabIndex={0}
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {state}
    </span>
  );
}

interface OpenClosedFiltersProps {
  isOpenMode: boolean;
  onClickMode: (v: string) => void;
  // onClickMode: (mode: 'open' | 'closed') => void;
}

/* 반복되는 코드2를  컴포넌트로 분리 3 */
export default function OpenClosedFilters({
  isOpenMode,
  onClickMode,
}: OpenClosedFiltersProps) {
  /**
    isOpenMode스테이트는 ListContainer.js로 옮기고(액션이 ListContainer라서 옮김) isOpenMode를 프롭으로 받음.
    const [isOpenMode, setIsOpenMode] = useState(true);
   */

  // const openModeDataSize = 1;
  // const closeModeDataSize = 2;

  return (
    <>
      <OpenClosedFilter
        state='Open'
        selected={isOpenMode}
        // onClick={() => setIsOpenMode(true)} 온클릭함수를 onClickMode로 바꾸고
        // ListContainer.js에서 onClickMode는 {setIsOpenMode}가 되어야함.
        onClick={() => onClickMode('open')}
      />
      <OpenClosedFilter
        state='Closed'
        selected={!isOpenMode}
        // onClick={() => setIsOpenMode(false)}
        onClick={() => onClickMode('closed')}
      />
    </>
  );
}
