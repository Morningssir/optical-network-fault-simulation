import React from 'react';
import { isNil } from 'lodash';
import { Drawer } from 'antd';
import TableList from '@/components/TableList';

const PlanTable = ({
  dataSource,
  extraColumns = [],
  options = [],
  workItem,
  itemDetail,
}) => {
  const columns = workItem.getTableColumns();

  return (
    <>
      <TableList
        dataSource={dataSource}
        columns={[...columns, ...extraColumns, ...options]}
        size="small"
        scroll={{ x: 200 }}
      />
      {!isNil(itemDetail) && itemDetail.isOpen && (
        <Drawer
          title={itemDetail.detail.name}
          getContainer={false}
          width="100%"
          height="fit-content"
          placement="right"
          style={{ position: 'absolute' }}
          visible={itemDetail.isOpen}
          onClose={itemDetail.onClose}
        >
          {itemDetail.content}
        </Drawer>
      )}
    </>
  );
};

export default PlanTable;
