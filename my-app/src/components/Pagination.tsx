import cx from 'clsx';
import styles from './Pagination.module.css';

interface OnClickProps {
  onClickPageButton: (page: number) => void;
}

interface PageButtonProps extends OnClickProps {
  number: number;
  selected: boolean;
  // onClick: (page: number) => void;
}
// 페이지네이션 안 버튼
// onClick을 밖에서 받아야 커스터마이징이 가능.
function PageButton({ number, selected, onClickPageButton }: PageButtonProps) {
  return (
    <button
      type='button'
      className={cx(styles.button, { [styles.selected]: selected })}
      onClick={() => onClickPageButton(number)}
    >
      {number}
    </button>
  );
}

interface PaginationProps extends OnClickProps {
  maxPage: number;
  currentPage: number;
  // onClickPageButton: (page: number) => void;
}

// 현재어떤 페이지를 보고있는지-currentPage, 최대페이지-maxPage
function Pagination({
  maxPage,
  currentPage,
  onClickPageButton,
}: PaginationProps) {
  return (
    <div>
      <button
        type='button'
        // className={cx(styles.button, { [styles.disabled]: currentPage === 1 })}
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === 1}
      >
        {'< Previous'}
      </button>
      {new Array(maxPage).fill(null).map((_, idx) => {
        const number = idx + 1;
        return (
          <PageButton
            key={`page-${number}`}
            number={number}
            onClickPageButton={onClickPageButton}
            selected={number === currentPage}
          />
        );
      })}
      <button
        type='button'
        // className={cx(styles.button, {[styles.disabled]: currentPage === maxPage})}
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === maxPage}
      >
        {'Next >'}
      </button>
    </div>
  );
}

export default Pagination;
