import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, message, Select } from 'antd';
import { addProject } from '@/services/project';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CreateForm = ({ handleAdd, modalVisible, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      addProject({ params: { ...fields } });
      hide();
      message.success('添加成功');
      form.resetFields();
      onCancel();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return (
    <Modal
      title="项目申请"
      destroyOnClose
      visible={modalVisible}
      okText="提交"
      cancelText="返回"
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input allowClear autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="topo"
          label="拓扑结构"
          rules={[{ required: true, message: '请选择拓扑结构' }]}
        >
          <Select>
            <Select.Option value="CERNET">CERNET</Select.Option>
            <Select.Option value="NSFNET">NSFNET</Select.Option>
            <Select.Option value="USNET">USNET</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  handleAdd: (params) => {
    dispatch({ type: 'pro/submit', payload: params });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
