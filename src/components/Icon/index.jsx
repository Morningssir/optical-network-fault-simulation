import {
  AuditOutlined,
  CheckCircleFilled,
  DashboardOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ImportOutlined,
  InsuranceOutlined,
  LeftOutlined,
  LineChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MergeCellsOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  ProfileOutlined,
  QuestionOutlined,
  ReloadOutlined,
  RightOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Icon = ({ type }) => {
  const Icons = {
    AuditOutlined: <AuditOutlined />,
    CheckCircleFilled: <CheckCircleFilled />,
    DashboardOutlined: <DashboardOutlined />,
    DatabaseOutlined: <DatabaseOutlined />,
    DeleteOutlined: <DeleteOutlined />,
    DeploymentUnitOutlined: <DeploymentUnitOutlined />,
    DownloadOutlined: <DownloadOutlined />,
    DownOutlined: <DownOutlined />,
    EditOutlined: <EditOutlined />,
    EnvironmentOutlined: <EnvironmentOutlined />,
    ImportOutlined: <ImportOutlined />,
    InsuranceOutlined: <InsuranceOutlined />,
    LeftOutlined: <LeftOutlined />,
    LogoutOutlined: <LogoutOutlined />,
    LineChartOutlined: <LineChartOutlined />,
    MenuFoldOutlined: <MenuFoldOutlined />,
    MergeCellsOutlined: <MergeCellsOutlined />,
    NodeIndexOutlined: <NodeIndexOutlined />,
    PlusOutlined: <PlusOutlined />,
    ProfileOutlined: <ProfileOutlined />,
    ReloadOutlined: <ReloadOutlined />,
    RightOutlined: <RightOutlined />,
    SafetyOutlined: <SafetyOutlined />,
    ThunderboltOutlined: <ThunderboltOutlined />,
    UserOutlined: <UserOutlined />,
  };

  const getIcon = (iconType) => {
    let comp = <QuestionOutlined />;

    let currentType = iconType;

    if (!currentType) {
      return comp;
    }

    if (!currentType.match(/.+(Outlined|Filled|TwoTone)$/i)) {
      currentType += 'Outlined';
    }

    if (Object.keys(Icons).indexOf(currentType) >= 0) {
      comp = Icons[currentType];
    }

    return comp;
  };

  return getIcon(type);
};

export default Icon;
