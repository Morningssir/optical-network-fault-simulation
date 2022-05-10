import React, { useState } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import TopoMap from '@/components/Map';
import NodeWorkplace from './NodeWorkplace';
import LinkWorkplace from './LinkWorkplace';
import ServiceWorkplace from './ServiceWorkplace';
import styles from './style.less';

const Workplace = ({ dataSource, loading }) => {
  const [currentTabKey, setCurrentTabKey] = useState('node');

  const getCurrentTabAndComponent = (current) => {
    switch (current) {
      case 'node':
        return <NodeWorkplace />;
      case 'link':
        return <LinkWorkplace />;
      case 'service':
      default:
        return <ServiceWorkplace />;
    }
  };

  const tabList = [
    { key: 'service', tab: '业务管理' },
    { key: 'node', tab: '节点管理' },
    { key: 'link', tab: '链路管理' },
  ];

  return (
    <>
      <Card className={styles.map} bodyStyle={{ padding: 0, height: '100%' }}>
        {/* <TopoMap /> */}
        <TopoMap dataSource={dataSource} />
      </Card>
      <Card
        className={styles.table}
        size="small"
        tabList={tabList}
        activeTabKey={currentTabKey}
        onTabChange={(activeTabKey) => setCurrentTabKey(activeTabKey)}
        headStyle={{ textAlign: 'center' }}
        bodyStyle={{ textAlign: 'center' }}
        tabProps={{ size: 'small' }}
      >
        {loading ? <PageLoading /> : getCurrentTabAndComponent(currentTabKey)}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading.effects['workplace/fetch'],
  dataSource: {
    nodeList: state.node.nodeList,
    linkList: state.link.linkList,
    serviceList: state.service.serviceList,
  },
});

export default connect(mapStateToProps)(Workplace);
