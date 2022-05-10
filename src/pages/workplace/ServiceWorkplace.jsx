import React from 'react';
import { connect } from 'dva';
import WorkplaceTable from './components/WorkplaceTable';
import { Service } from '@/protos/Service';

const ServiceWorkplace = ({ serviceList }) => {
  return <WorkplaceTable workItem={Service} dataSource={serviceList} />;
};

const mapStateToProps = (state) => ({
  serviceList: state.service.serviceList,
});

export default connect(mapStateToProps)(ServiceWorkplace);
