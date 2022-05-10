import React, { useState } from 'react';
import { connect } from 'dva';
import PlanTable from '../PlanTable';
import LinkTraffic from '../LinkTraffic';
import { Link } from '@/protos/Link';

const LinkTable = ({ linkList, dispatch }) => {
  const [itemDetail, setItemDetail] = useState({ isOpen: false });

  const handleClose = () => {
    setItemDetail({ isOpen: false });
    dispatch({
      type: 'planning/clearItemSelection',
    });
  };

  const options = [
    {
      title: '操作',
      dataIndex: 'option',
      width: 120,
      render: (_, record) => (
        <a
          onClick={() => {
            setItemDetail({
              isOpen: true,
              detail: record,
              content: <LinkTraffic itemKey={record.id} />,
              onClose: handleClose,
            });
          }}
        >
          详细
        </a>
      ),
    },
  ];

  return (
    <PlanTable
      dataSource={linkList}
      options={options}
      workItem={Link}
      itemDetail={itemDetail}
    />
  );
};

const mapStateToProps = (state) => ({
  linkList: state.link.linkList,
});

export default connect(mapStateToProps)(LinkTable);
