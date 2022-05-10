import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import TableList from '@/components/TableList';
import { Service } from '@/protos/Service';
import { queryPlanningLink } from '../service';
import { Spin } from 'antd';

const LinkTraffic = (props) => {
  const { itemKey, projectId, dispatch } = props;

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const columns = Service.getTableColumns();

  useEffect(() => {
    if (itemKey) setLoading(true);
    queryPlanningLink({ projectId, linkId: itemKey }).then((response) => {
      dispatch({
        type: 'planning/saveItemSelection',
        payload: {
          selectedNodeKeys: [],
          selectedLinkKeys: [itemKey],
          selectedServiceKeys: response.map(({ id }) => id),
        },
      });
      setDetail(response);
      setLoading(false);
    });
  }, [itemKey]);

  return (
    <Spin spinning={loading}>
      <TableList
        dataSource={detail}
        columns={columns}
        size="small"
        scroll={{ x: 200 }}
      />
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  projectId: state.project.currentPro.id,
});

export default connect(mapStateToProps)(LinkTraffic);
