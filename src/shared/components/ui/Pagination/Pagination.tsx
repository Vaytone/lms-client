import React from 'react';
import { PaginationProps } from '@components/ui/Pagination/types';
import ReactPaginate from 'react-paginate';
import Button from '@components/ui/Button/Button';
import styles from './Pagination.module.scss';

const PaginationElem: React.FC<PaginationProps> = ({ onPageChange, pageCount, page }) => {
  return (
    <ReactPaginate
      breakLabel={<div className={styles.BreakLabel}/>}
      nextLabel={<Button text='Next'/>}
      disabledLinkClassName={styles.DisabledButton}
      breakClassName={styles.Break}
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount || 0}
      className={styles.Wrapper}
      pageClassName={styles.Item}
      activeClassName={styles.ItemActive}
      previousClassName={styles.Buttons}
      nextClassName={styles.Buttons}
      pageLinkClassName={styles.Link}
      forcePage={page}
      previousLabel={<Button text='Prev' styleType='bordered'/>}
      renderOnZeroPageCount={null}
      disableInitialCallback
    />
  );
};

export default PaginationElem;
