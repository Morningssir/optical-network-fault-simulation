import moment from 'moment';
import { Select } from 'antd';

const { Option } = Select;

export class Service {
  constructor(props) {
    const { id, name, sourceName, targetName, year, type, protect, rate } =
      props;
    this.id = id || '';
    this.name = name || '';
    this.sourceName = sourceName || '';
    this.targetName = targetName || '';
    this.year = year || '';
    this.type = type || '';
    this.protect = protect || '';
    this.rate = rate || '';
  }

  static getTableColumns() {
    return [
      {
        title: '链路名称',
        dataIndex: 'name',
        fixed: 'left',
        width: 100,
      },
      {
        title: '首节点',
        dataIndex: 'sourceName',
        width: 100,
      },
      {
        title: '末节点',
        dataIndex: 'targetName',
        width: 100,
      },
      {
        title: '年份',
        dataIndex: 'year',
        width: 100,
      },
      {
        title: '业务类型',
        dataIndex: 'type',
        width: 100,
      },
      {
        title: '保护级别',
        dataIndex: 'protect',
        width: 100,
      },
      {
        title: '业务带宽',
        dataIndex: 'rate',
        width: 100,
      },
    ];
  }

  static getFormColumns(nodeList) {
    return [
      {
        title: '链路名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: '首节点',
        dataIndex: 'source',
        required: true,
        valueType: 'option',
        options: nodeList.map(({ id, name }) => ({
          value: id,
          text: name,
        })),
      },
      {
        title: '末节点',
        dataIndex: 'target',
        required: true,
        valueType: 'option',
        options: nodeList.map(({ id, name }) => ({
          value: id,
          text: name,
        })),
      },
      {
        title: '年份',
        dataIndex: 'year',
        required: true,
        valueType: 'dateTime',
      },
      {
        title: '业务类型',
        dataIndex: 'type',
        required: true,
        valueType: 'option',
        options: [
          { value: 'IP', text: 'IP' },
          { value: '通信', text: '通信' },
          { value: '数据', text: '数据' },
          { value: '指挥', text: '指挥' },
          { value: '视频', text: '视频' },
        ],
      },
      {
        title: '保护级别',
        dataIndex: 'protect',
        required: true,
        valueType: 'option',
        options: [
          { value: 'NORMAL', text: '无保护' },
          { value: 'NORMAL11', text: '1+1' },
          { value: 'RESTORATION', text: '重路由' },
          { value: 'RESTORATION11', text: '1+1+重路由' },
          { value: 'PERMANENT11', text: '永久1+1' },
        ],
      },
      {
        title: '业务带宽',
        dataIndex: 'rate',
        required: true,
        valueType: 'option',
        options: [{ value: '155M', text: '155M' }],
      },
    ];
  }

  static createAction(fields) {
    return {
      type: 'service/submit',
      payload: {
        ...this.convertToSubmitFormat(fields),
      },
    };
  }

  static removeAction(itemId) {
    return { type: 'service/submit', payload: { linkId: itemId } };
  }

  static updateAction(itemId, fields) {
    return {
      type: 'service/submit',
      payload: {
        linkId: itemId,
        ...this.convertToSubmitFormat(fields),
      },
    };
  }

  static convertToFormFormat(fields) {
    const { year } = fields;
    return {
      ...fields,
      year: moment(`${year}`),
    };
  }

  static convertToSubmitFormat(fields) {
    const { year } = fields;
    return {
      ...fields,
      year: year.format('YYYY'),
    };
  }
}
