import React from 'react';
import { connect } from 'dva';
import PlanTable from '../PlanTable';
import { Node } from '@/protos/Node';

const NodeTable = ({ nodeList }) => {
  return <PlanTable dataSource={nodeList} workItem={Node} />;
};

const mapStateToProps = (state) => ({
  nodeList: state.node.nodeList,
});

export default connect(mapStateToProps)(NodeTable);
