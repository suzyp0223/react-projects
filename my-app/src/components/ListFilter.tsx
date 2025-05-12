import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './ListFilter.module.css';

import Modal from './Modal';
import { GITHUB_API } from '../api';
import { Data, List } from '../model/issues';

interface SearchItem {
  name: string;
  color?: string;
  [key: string]: any;
}

interface ListFilterItemProps {
  // children => 객체, 하늘색표시
  children: string;
  placeholder?: string;
  searchDataList: List[]; // searchDataList: SearchItem[]
  showModal: boolean;
  // onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick: () => void;
  onClose: () => void;
  // onChangeFilter => 함수, 노랑색표시
  onChangeFilter: (value: Record<string, string>) => void;
  // onChangeFilter: Record<string, string>; // 데이터 구조(객체) 노랑색표시
}

// children은 태그를 여는 것 처럼 사용 가능. 모달컴포넌트
function ListFilterItem({
  children,
  placeholder,
  searchDataList,
  showModal,
  onClick,
  onClose,
  onChangeFilter,
}: ListFilterItemProps) {
  // 스테이트가 각각 모달마다 있어서 모달6개다 한번에 열림.
  // const [showModal, setShowModal] = useState(false);
  // 1번모달 열린 상태에서 2번모달 열렸을때 1번 꺼지게 변경 -> showModal스테이트를 ListFilter함수로 이동.

  const [list, setList] = useState<List[]>(searchDataList); /** data */
  /**
    프롭스가 변하면 list 스테이트도 변하기 때문에
    useEffect문에 디펜던시(의존성)을 지정한다.
    searchDataList를 디펜던시로 등록한다.
  */
  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);

  return (
    <div className={styles.filterItem}>
      <span role='button' tabIndex={0} onClick={onClick}>
        {children} ▾
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose} // 부모에서 showModal을 null로 설정
          placeholder={placeholder}
          searchDataList={list} // list는 API 결과가 들어감
          onClickCell={(params) => {
            // onClickCell={(cellInfo) => {
            // 클릭된 정보를 통해 리스트 필터링
            // const data = getData('필터링 된 정보');
            onChangeFilter(params);
          }}
        />
      </div>
    </div>
  );
}

interface ListFilterProps {
  onChangeFilter: (value: Record<string, string>) => void;
}

// 탭 컴포넌트
export default function ListFilter({ onChangeFilter }: ListFilterProps) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [list, setList] = useState<Record<string, SearchItem[]>>({});

  const filterList = ['Labels', 'Milestones', 'Assignees', 'Issues'];

  // 데이터 가공 name, title, login -> name
  const getData = async (apiPath: string) => {
    try {
      const res: Data = await axios.get(
        `${GITHUB_API}/repos/facebook/react/${apiPath}`,
      );

      let result = [];
      switch (apiPath) {
        case 'assignees':
          result = res.data.map((d) => ({ name: d.login }));
          break;
        case 'milestones':
          result = res.data.map((d) => ({ name: d.title }));
          break;
        case 'issues':
          result = res.data.flatMap((d) =>
            d.labels.map((label: { name: string; color: string }) => ({
              name: label.name,
              color: label.color,
            })),
          );
          break;
        case 'labels':
        default:
          result = res.data.map((d) => ({ ...d, name: '' }));
      }

      // 🔧 setList에 result를 직접 넘기지 않고, 키를 지정해서 객체로 감쌈
      const key = apiPath.charAt(0).toUpperCase() + apiPath.slice(1); // 'labels' -> 'Labels'

      setList((prev) => ({
        ...prev,
        [key]: result,
      }));
    } catch (error) {
      console.error('📛 데이터 요청 실패:', error);
    }
  };

  useEffect(() => {
    if (showModal) {
      const apiPath = showModal.toLowerCase();
      getData(apiPath);
    }
  }, [showModal]);

  return (
    <div className={styles.filterLists}>
      {/* // 1번모달 열린 상태에서 2번모달 열렸을때 1번 꺼지게 변경 -> */}

      {filterList.map((filter) => (
        <ListFilterItem
          key={filter}
          placeholder={`Filter by ${filter}`}
          // 🔧 전체 list 객체에서 필터별 배열만 전달
          searchDataList={list[filter] ?? []}
          showModal={showModal === filter}
          onClick={() => setShowModal(filter)}
          onClose={() => setShowModal(null)}
          onChangeFilter={onChangeFilter}
        >
          {filter}
        </ListFilterItem>
      ))}
    </div>
  );
}
