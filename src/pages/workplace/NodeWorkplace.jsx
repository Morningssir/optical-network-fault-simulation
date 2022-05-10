import React from 'react';
import { connect } from 'dva';
import WorkplaceTable from './components/WorkplaceTable';
import { Node } from '@/protos/Node';

const NodeWorkplace = ({ nodeList }) => {
  return <WorkplaceTable workItem={Node} dataSource={nodeList} />;
};

const mapStateToProps = (state) => ({
  nodeList: state.node.nodeList,
});

export default connect(mapStateToProps)(NodeWorkplace);
