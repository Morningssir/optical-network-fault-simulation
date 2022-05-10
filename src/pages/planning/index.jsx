import React, { useState } from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import { PageLoading } from '@ant-design/pro-layout';
import NodeTable from './components/Table/NodeTable';
import LinkTable from './components/Table/LinkTable';
import ServiceTable from './components/Table/ServiceTable';
import TopoMap from '@/components/Map';
import styles from './style.less';

const Planning = (props) => {
  console.log(props);
  const { loading, dataSource, itemSelection } = props;
  const { selectedNodeKeys, selectedLinkKeys, selectedServiceKeys } =
    itemSelection;

  const [currentTabKey, setCurrentTabKey] = useState('service');

  const handleSubmit = () => {};

  const getCurrentTabAndComponent = (current) => {
    switch (current) {
      case 'node':
        return <NodeTable />;
      case 'link':
        return <LinkTable />;
      case 'service':
      default:
        return <ServiceTable />;
    }
  };

  const tabList = [
    { key: 'service', tab: '业务管理' },
    { key: 'node', tab: '节点管理' },
    { key: 'link', tab: '链路管理' },
  ];

  const selection = {
    nodeSelection: {
      selectedItemKeys: selectedNodeKeys,
    },
    linkSelection: {
      selectedItemKeys: selectedLinkKeys,
    },
    serviceSelection: {
      selectedItemKeys: selectedServiceKeys,
    },
  };

  const submitButton = (
    <Button type="primary" onClick={handleSubmit}>
      规划项目
    </Button>
  );

  if (loading) return <PageLoading />;

  return (
    <>
      <Card className={styles.map} bodyStyle={{ padding: 0, height: '100%' }}>
        <TopoMap dataSource={dataSource} itemSelection={selection} />
      </Card>
      <Card
        className={styles.table}
        size="small"
        tabList={tabList}
        activeTabKey={currentTabKey}
        onTabChange={setCurrentTabKey}
        tabProps={{ size: 'small' }}
        tabBarExtraContent={submitButton}
        headStyle={{ textAlign: 'center' }}
        bodyStyle={{ textAlign: 'center' }}
      >
        {getCurrentTabAndComponent(currentTabKey)}
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
  itemSelection: state.planning.itemSelection,
});

export default connect(mapStateToProps)(Planning);
