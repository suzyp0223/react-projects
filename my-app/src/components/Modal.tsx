import React, { useState, useEffect, useRef } from 'react';
import cx from 'clsx';

import styles from './Modal.module.css';
import { List } from '../model/issues';

interface ModalProps {
  opened: boolean;
  title: string;
  placeholder?: string;
  searchDataList: List[];
  onClickCell: (value: Record<string, string>) => void; // 객체가 인자로 들어옴.
  onClose: () => void;
  // onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // <button onClick={(e) => onClose(e)}>닫기</button> .이렇게 썼다면 MouseEvent<HTMLButtonElement> 써야함.
}
// 필터링데이터, 커스터마이징테이터 프롭스로 받음-searchDataList
function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}: ModalProps) {
  // 필터링된 데이터상태- 원천데이터가 있어야해서 searchDataList가 초기값
  const [filteredData, setFilteredData] = useState<List[]>(searchDataList);
  const [searchValue, setSearchValue] = useState('');

  /*
    원천데이터인 searchDataList를 가공해서 필터링.
  */
  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      // setFilteredData(searchDataList.filter((item) => item === searchValue));
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, searchValue]);

  // 모달 외부 클릭시 모달종료
  // const modalRef = useRef(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose(); // 바깥 클릭시 모달 닫기
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!opened) return null;

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header} ref={modalRef}>
        <span>Filter by {title}</span>
        <button type='button' onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {/* 맵을 통해 순회하여 원하는 컴포넌트로 그려줌 */}
        {Array.isArray(filteredData) &&
          filteredData.map((data) => {
            const isLabel = title.toLowerCase() === 'labels';
            const paramKey = isLabel ? 'labels' : title.toLowerCase();

            return (
              <div
                role='button'
                tabIndex={0}
                className={styles.item}
                key={`${title}-${data.name}`}
                onClick={() => {
                  // 변수를 키에 넣으려면 []로 묶는다.
                  onClickCell({ [paramKey]: data.name });
                }}
              >
                {data.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Modal;
