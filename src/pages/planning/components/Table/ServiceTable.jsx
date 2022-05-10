import React, { useState } from 'react';
import { connect } from 'dva';
import { Badge, Button } from 'antd';
import PlanTable from '../PlanTable';
import ServiceRoute from '../ServiceRoute';
import { Service } from '@/protos/Service';
import { STATUS_LOCALE } from '@/utils/locale';

const ServiceTable = ({ serviceList, dispatch }) => {
  const [itemDetail, setItemDetail] = useState({ isOpen: false });

  const handleClose = () => {
    setItemDetail({ isOpen: false });
    dispatch({
      type: 'planning/clearItemSelection',
    });
  };

  const handleDetail = (record) => {
    setItemDetail({
      detail: record,
      content: <ServiceRoute itemKey={record.id} />,
      isOpen: true,
      onClose: handleClose,
    });
  };

  const extraColumns = [
    {
      title: '状态',
      dataIndex: 'status',
      width: 200,
      render: (_, record) => (
        <Badge
          status={STATUS_LOCALE[record.status].status}
          text={STATUS_LOCALE[record.status].text}
        />
      ),
    },
  ];

  const options = [
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: (_, record) => (
        <Button type="link" onClick={handleDetail.bind(this, record)}>
          详细
        </Button>
      ),
    },
  ];

  return (
    <PlanTable
      dataSource={serviceList}
      extraColumns={extraColumns}
      options={options}
      workItem={Service}
      itemDetail={itemDetail}
    />
  );
};

const mapStateToProps = (state) => ({
  serviceList: state.service.serviceList,
});

export default connect(mapStateToProps)(ServiceTable);
