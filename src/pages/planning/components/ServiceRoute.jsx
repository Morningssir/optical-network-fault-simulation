import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import {
  Button,
  Descriptions,
  Space,
  Typography,
  Badge,
  Spin,
  Empty,
} from 'antd';
import { STATUS_LOCALE } from '@/utils/locale';
import { queryPlanningService } from '../service';

const { Text } = Typography;

const ServiceRoute = (props) => {
  const { itemKey, projectId, dispatch } = props;

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const {
    id,
    name,
    sourceName,
    targetName,
    year,
    type,
    rate,
    protect,
    status,
    route,
  } = detail || {};

  const renderDetailRoute = (route) => {
    let routeList = [];
    const { nodeList = [], linkList = [] } = route;
    const nodeNameList = nodeList.map(({ name }) => <Text>{name}</Text>);
    const linkNameList = linkList.map(({ name }) => (
      <Text type="secondary">( {name} )</Text>
    ));
    const n = nodeList.length + linkList.length;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        routeList.push(nodeNameList[i / 2]);
      } else {
        routeList.push(linkNameList[(i - 1) / 2]);
      }
    }
    return (
      <Space
        wrap={true}
        split={
          <div
            style={{
              width: 20,
              height: 2,
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          />
        }
      >
        {routeList}
      </Space>
    );
  };

  useEffect(() => {
    if (itemKey) setLoading(true);
    queryPlanningService({ projectId, serviceId: itemKey }).then((response) => {
      const { route } = response;
      const { nodeList, linkList } = route;
      dispatch({
        type: 'planning/saveItemSelection',
        payload: {
          selectedNodeKeys: nodeList.map(({ id }) => id),
          selectedLinkKeys: linkList.map(({ id }) => id),
          selectedServiceKeys: [itemKey],
        },
      });
      setLoading(false);
      setDetail(response);
    });
  }, [itemKey]);

  if (!detail) return <Empty />;

  return (
    <Spin spinning={loading}>
      <Descriptions size="small" layout="vertical" bordered>
        <Descriptions.Item label="业务名称">{name}</Descriptions.Item>
        <Descriptions.Item label="首节点">{sourceName}</Descriptions.Item>
        <Descriptions.Item label="末节点">{targetName}</Descriptions.Item>
        <Descriptions.Item label="年份">{year}</Descriptions.Item>
        <Descriptions.Item label="业务类型">{type}</Descriptions.Item>
        <Descriptions.Item label="带宽">{rate}</Descriptions.Item>
        <Descriptions.Item label="保护级别" span={1}>
          {protect}
        </Descriptions.Item>
        <Descriptions.Item label="状态" span={3}>
          <Badge
            status={STATUS_LOCALE[status].status}
            text={STATUS_LOCALE[status].text}
          />
        </Descriptions.Item>
        <Descriptions.Item label="工作路由" span={3}>
          {renderDetailRoute(route)}
        </Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};

const mapStateToProps = (state) => ({
  projectId: state.project.currentPro.id,
});

export default connect(mapStateToProps)(ServiceRoute);
