import cx from 'clsx';
import React from 'react';
import styles from './ListItemLayout.module.css';

interface ListItemLayoutProps {
  children?: React.ReactNode;
  className?: string;
  checked?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ListItemLayout({
  children,
  className,
  checked,
  onClick,
}: ListItemLayoutProps) {
  return (
    // 이중 클래스네임 - cx:클래스네임 두개를 한번에 묶기
    <div className={cx(styles.wrapper, className)}>
      <input
        type='checkbox'
        className={styles.checkbox}
        checked={checked}
        onChange={onClick}
      />
      {children}
    </div>
  );
}

export default ListItemLayout;
