import moment from 'moment';

export class Link {
  constructor(props) {
    const {
      id,
      name,
      sourceName,
      targetName,
      createYear,
      completedYear,
      length,
      rate,
    } = props;
    this.id = id || '';
    this.name = name || '';
    this.sourceName = sourceName || '';
    this.targetName = targetName || '';
    this.createYear = createYear || '';
    this.completedYear = completedYear || '';
    this.length = length || 0.0;
    this.rate = rate || '155M';
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
        title: '建设年份',
        dataIndex: 'createYear',
        width: 100,
      },
      {
        title: '竣工年份',
        dataIndex: 'completedYear',
        width: 100,
      },
      {
        title: '链路长度（KM）',
        dataIndex: 'length',
        width: 100,
      },
      {
        title: '链路带宽',
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
        title: '链路代码',
        dataIndex: 'code',
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
        title: '建设年份',
        dataIndex: 'createYear',
        width: 100,
        required: true,
        valueType: 'dateTime',
      },
      {
        title: '竣工年份',
        dataIndex: 'completedYear',
        width: 100,
        required: true,
        valueType: 'dateTime',
      },
      {
        title: '链路长度（KM）',
        dataIndex: 'length',
        required: true,
        valueType: 'number',
      },
      {
        title: '链路带宽',
        dataIndex: 'rate',
        required: true,
        valueType: 'option',
        options: [{ value: '155M', text: '155M' }],
      },
    ];
  }

  static createAction(fields) {
    return {
      type: 'link/submit',
      payload: {
        ...this.convertToSubmitFormat(fields),
      },
    };
  }

  static removeAction(itemId) {
    return { type: 'link/submit', payload: { linkId: itemId } };
  }

  static updateAction(itemId, fields) {
    return {
      type: 'link/submit',
      payload: {
        linkId: itemId,
        ...this.convertToSubmitFormat(fields),
      },
    };
  }

  static convertToFormFormat(fields) {
    const { createYear, completedYear } = fields;
    return {
      ...fields,
      createYear: moment(`${createYear}`),
      completedYear: moment(`${completedYear}`),
    };
  }

  static convertToSubmitFormat(fields) {
    const { createYear, completedYear } = fields;
    return {
      ...fields,
      createYear: createYear.format('YYYY'),
      completedYear: completedYear.format('YYYY'),
    };
  }
}
