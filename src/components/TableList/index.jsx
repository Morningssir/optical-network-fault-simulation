import React from 'react';
import { Table } from 'antd';
import renderToolBar from './renderToolBar';

const TableList = ({
  dataSource,
  columns,
  actions,
  extraActions,
  ...restProps
}) => {
  const newDataSource = dataSource.map((item) => ({ ...item, key: item.id }));
  const newColumns = columns.map((col) => ({ ...col, ellipsis: true }));

  return (
    <>
      {(actions && actions.length > 0) ||
      (extraActions && extraActions.length > 0)
        ? renderToolBar(actions, extraActions)
        : null}
      <Table {...restProps} dataSource={newDataSource} columns={newColumns} />
    </>
  );
};

export default TableList;
