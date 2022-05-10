import React from 'react';
import { Button, Form } from 'antd';
import renderFormItem from './renderFormItem';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './style.less';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { span: 18, offset: 6 },
};

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '请输入${label}',
};

const TableForm = ({ columns, initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      {...layout}
      form={form}
      validateMessages={validateMessages}
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      {columns.map((column) => renderFormItem(column))}
      <Form.Item {...tailLayout}>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => {
            onSubmit();
          }}
        >
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TableForm;
