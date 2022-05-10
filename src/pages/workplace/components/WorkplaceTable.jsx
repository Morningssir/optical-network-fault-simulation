import React, { useState } from 'react';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import { Divider, message } from 'antd';
import FormModal from '@/components/FormModal';
import Icon from '@/components/Icon';
import TableList from '@/components/TableList';
import WorkplaceForm from './WorkplaceForm';

const WorkplaceTable = ({ dispatch, dataSource, workItem }) => {
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleCreate = (fields) => {
    if (isEmpty(fields)) return;
    const hide = message.loading('正在添加');
    try {
      dispatch(workItem.createAction(fields));
      hide();
      message.success('添加成功');
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  const handleRemove = (itemId) => {
    const hide = message.loading('正在删除');
    try {
      dispatch(workItem.removeAction(itemId));
      hide();
      message.success('删除成功');
    } catch (error) {
      hide();
      message.error('删除失败请重试！');
    }
  };

  const handleUpdate = (itemId, fields) => {
    if (isEmpty(fields)) return;
    const hide = message.loading('正在修改');
    try {
      dispatch(workItem.updateAction(itemId, fields));
      hide();
      message.success('修改成功');
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  const columns = workItem.getTableColumns();

  const options = [
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: (_, record) => (
        <>
          <a onClick={() => handleRemove(record.id)}>删除</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrent(record);
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  const actions = [
    {
      value: '创建',
      type: 'primary',
      icon: <Icon type="Plus" />,
      bindEvent: () => handleCreateModalVisible(true),
    },
  ];

  const extraActions = [
    {
      value: '下载',
      icon: <Icon type="Download" />,
      bindEvent: () => {},
    },
  ];

  return (
    <>
      <TableList
        dataSource={dataSource}
        columns={[...columns, ...options]}
        actions={actions}
        extraActions={extraActions}
        size="small"
        scroll={{ x: 200 }}
      />
      <FormModal
        title="创建"
        modalVisible={createModalVisible}
        onCancel={() => handleCreateModalVisible(false)}
      >
        <WorkplaceForm workItem={workItem} onSubmit={handleCreate} />
      </FormModal>
      <FormModal
        title="更新"
        modalVisible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false)}
      >
        <WorkplaceForm
          workItem={workItem}
          initialValues={current}
          onSubmit={(fields) => handleUpdate(current.id, fields)}
        />
      </FormModal>
    </>
  );
};

export default connect()(WorkplaceTable);
