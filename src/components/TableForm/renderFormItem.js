import { Form, Input, InputNumber, Select, DatePicker } from 'antd';

const renderFormItem = ({
  title,
  dataIndex,
  valueType,
  options,
  required = false,
  rules = [],
  renderItem,
}) => {
  if (required) rules.push({ required });

  const renderFormComponent = (type) => {
    switch (type) {
      case 'tel':
        return (
          <Input type="tel" autoComplete="off" placeholder={`请输入${title}`} />
        );
      case 'number':
        return (
          <InputNumber autoComplete="off" placeholder={`请输入${title}`} />
        );
      case 'option':
        return (
          <Select placeholder={`请选择${title}`}>
            {options &&
              options.length > 0 &&
              options.map(({ value, text }) => (
                <Select.Option value={value}>{text}</Select.Option>
              ))}
          </Select>
        );
      case 'dateTime':
        return <DatePicker picker="year" placeholder={`请输入${title}`} />;
      default:
        return (
          <Input allowClear autoComplete="off" placeholder={`请输入${title}`} />
        );
    }
  };
  return (
    dataIndex !== 'option' && (
      <Form.Item key={dataIndex} name={dataIndex} label={title} rules={rules}>
        {renderItem || renderFormComponent(valueType)}
      </Form.Item>
    )
  );
};

export default renderFormItem;
