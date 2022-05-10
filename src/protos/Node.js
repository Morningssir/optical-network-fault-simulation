import moment from 'moment';

export class Node {
  constructor(props) {
    const {
      id,
      name,
      code,
      createYear,
      completedYear,
      capacity,
      portNum,
      manager,
      phone,
    } = props;
    this.id = id || '';
    this.name = name || '';
    this.code = code || '';
    this.createYear = createYear || '';
    this.completedYear = completedYear || '';
    this.capacity = capacity || 0;
    this.portNum = portNum || 0;
    this.manager = manager || '';
    this.phone = phone || '';
  }

  static getTableColumns() {
    return [
      {
        title: '节点名称',
        dataIndex: 'name',
        fixed: 'left',
        width: 100,
      },
      {
        title: '节点代码',
        dataIndex: 'code',
        width: 100,
      },
      {
        title: '开通年份',
        dataIndex: 'createYear',
        width: 100,
      },
      {
        title: '竣工年份',
        dataIndex: 'completedYear',
        width: 100,
      },
      {
        title: '节点容量',
        dataIndex: 'capacity',
        width: 100,
      },
      {
        title: '端口数目',
        dataIndex: 'portNum',
        width: 100,
      },
      {
        title: '负责人',
        dataIndex: 'manager',
        width: 100,
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        width: 100,
      },
    ];
  }

  static getFormColumns() {
    return [
      {
        title: '节点名称',
        dataIndex: 'name',
        required: true,
      },
      {
        title: '节点代码',
        dataIndex: 'code',
        required: true,
      },
      {
        title: '开通年份',
        dataIndex: 'createYear',
        required: true,
        valueType: 'dateTime',
      },
      {
        title: '竣工年份',
        dataIndex: 'completedYear',
        required: true,
        valueType: 'dateTime',
      },
      {
        title: '节点容量',
        dataIndex: 'capacity',
        required: true,
        valueType: 'number',
      },
      {
        title: '端口数目',
        dataIndex: 'portNum',
        required: true,
        valueType: 'number',
      },
      {
        title: '负责人',
        dataIndex: 'manager',
        required: true,
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        required: true,
        valueType: 'tel',
        rules: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: '请输入正确的联系方式',
          },
        ],
      },
    ];
  }

  static createAction(fields) {
    return {
      type: 'node/submit',
      payload: {
        ...this.convertToSubmitFormat(fields),
      },
    };
  }

  static removeAction(itemId) {
    return { type: 'node/submit', payload: { nodeId: itemId } };
  }

  static updateAction(itemId, fields) {
    return {
      type: 'node/submit',
      payload: {
        nodeId: itemId,
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
