import React from 'react';
import { connect } from 'dva';
import TableForm from '@/components/TableForm';

const WorkplaceForm = ({ nodeList, workItem, initialValues, onSubmit }) => {
  const columns = workItem.getFormColumns(nodeList);
  const values = initialValues && workItem.convertToFormFormat(initialValues);
  return (
    <TableForm columns={columns} onSubmit={onSubmit} initialValues={values} />
  );
};

const mapStateToProps = (state) => ({
  nodeList: state.node.nodeList,
});

export default connect(mapStateToProps)(WorkplaceForm);
