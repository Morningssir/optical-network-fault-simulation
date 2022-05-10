import React from 'react';
import { connect } from 'dva';
import WorkplaceTable from './components/WorkplaceTable';
import { Link } from '@/protos/Link';

const Workplace = ({ linkList }) => {
  return <WorkplaceTable workItem={Link} dataSource={linkList} />;
};

const mapStateToProps = (state) => ({
  linkList: state.link.linkList,
});

export default connect(mapStateToProps)(Workplace);
