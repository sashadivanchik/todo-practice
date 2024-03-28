import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { PaginationProps } from './types';
import styles from './Pagination.module.css';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.paginationContainer}>
      <AntPagination
        current={currentPage}
        total={total}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
};
