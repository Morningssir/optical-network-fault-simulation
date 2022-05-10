import React from 'react';
import { Modal } from 'antd';

/**
 * 高级表格的表单模态
 */
const FormModal = ({
  title,
  modalVisible,
  onCancel,
  bodyStyle,
  children,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      maskClosable={false}
      title={title}
      visible={modalVisible}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
      bodyStyle={{ ...bodyStyle, maxHeight: 720, overflow: 'auto' }}
    >
      {children}
    </Modal>
  );
};

export default FormModal;
