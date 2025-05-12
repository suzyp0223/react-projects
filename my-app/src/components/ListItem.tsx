import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 locale 가져오기

import React from 'react';
import styles from './ListItem.module.css';

import { ListItemData } from '../model/issues';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface ListItemProps {
  checked: boolean;
  // onClickCheckBox,
  onClickTitle?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  data: ListItemData;
  children?: React.ReactNode;
  className?: string;
  onChangeCheckBox: () => void;
}

function ListItem({
  checked,
  // onChangeCheckBox,
  onClickTitle,
  // badges,
  data,
  children,
}: ListItemProps) {
  // const badges = data.labels;
  const state = data.state === 'open' ? 'opened' : 'closed';
  const date = data.state === 'open' ? data.created_at : data.closed_at;

  return (
    // <ListItemLayout checked={checked} onClick={onClickCheckBox}>
    <div className={styles.listItemInner}>
      <div className={styles.leftContent}>
        <div
          role='button'
          tabIndex={0}
          onClick={onClickTitle}
          className={styles.title}
        >
          {data.title}
          {/* badges가 있을때만 씀. */}
          {/* {badges.length > 0 &&
              badges.map((props, idx) => (
                // {badges &&
                //   badges.map((badgeProps, idx) => (
                // <Badge key={idx} title="Bug" color="red" /> 타이틀내용을 벳지를 쓸곳, ListContainer에서 작성함
                <Badge key={`${idx}`} {...props} />
              ))} */}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()} by {data.user.login}
        </div>
      </div>
      {children && <div className={styles.rightContent}>{children}</div>}
    </div>
    // </ListItemLayout >
  );
}

export default ListItem;
