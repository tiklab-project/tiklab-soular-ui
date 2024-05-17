import {store as easStore} from "./store";
import App from "./app";
import SettingContent from "./setting/navigator/SettingContent";
import SyncComponent from "./common/lazy/SyncComponent";
import Portal from "./common/layout/Portal";

const Layout = SyncComponent(() => import('./common/layout/Layout'));

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./login/ExcludeProductUser'))
const Logout=SyncComponent(()=>import("./login/Logout"))
const Wechat=SyncComponent(()=>import("./login/Wechat"))

const NotFound = SyncComponent(()=>import('./login/NotFound'))
const NoAccess = SyncComponent(()=>import('./setting/privilege/NoAccess'))

/**
 * 首页工作台
 * @type {LazyComponent|*}
 */
const WidgetWork = SyncComponent(() => import('./home/components/WidgetWork'))

/**
 * 日志
 */
const Oplog = SyncComponent(()=>import('./home/components/Oplog'))

/**
 * 代办
 */
const Todo = SyncComponent(() => import('./home/components/Todo'))

/**
 * 用户管理
 */
const OrgaManagement = SyncComponent(() => import('./setting/user/Orga'));
const UserManagement = SyncComponent(() => import('./setting/user/User'));
const PortalDirectory = SyncComponent(() => import('./setting/user/Directory'));
const UserGroupPage = SyncComponent(() => import('./setting/user/UserGroup'));


/**
 * 系统设置
 */
const Setting = SyncComponent(()=> import('./setting/navigator/setting'));

const SettingHome = SyncComponent(() => import('./setting/home/component/SettingHome'));

const MessageSendType = SyncComponent(() => import('./setting/message/MessageSendType'));
const MessageNotice = SyncComponent(() => import('./setting/message/MessageNotice'));
const PluginList = SyncComponent(() => import('./setting/plugin/Plugin'))

const ProductAuth = SyncComponent(() => import('./setting/licence/ProductAuth'));
const VersionPage = SyncComponent(() => import('./setting/licence/Version'));
const SystemRole = SyncComponent(() => import('./setting/privilege/SystemRole'));

const LogListPage = SyncComponent(()=> import('./setting/secuity/LogList'))
const DataImport = SyncComponent(()=>import('./setting/integration/dataImport/components/DataImport'))

const BackupRestore = SyncComponent(()=>import('./setting/secuity/BackupRestore'))


/**
 * 基础数据
 * @type {LazyComponent|*}
 */
const SystemFeature=SyncComponent(()=>import("./setting/base/privilege/SystemFeature"))
const SystemRoleTrue=SyncComponent(()=>import("./setting/base/privilege/SystemRoleTrue"))
const ProjectRole=SyncComponent(()=>import("./setting/base/privilege/ProjectRole"))
const ProjectFeature=SyncComponent(()=>import("./setting/base/privilege/ProjectFeature"))
const ProjectVirtualRole=SyncComponent(()=>import("./setting/base/privilege/ProjectVirtualRole"))

const MyTodoTask=SyncComponent(()=>import("./setting/base/message/MyTodoTask"))
const Task=SyncComponent(()=>import("./setting/base/message/Task"))
const TodoTemp=SyncComponent(()=>import("./setting/base/message/TodoTemp"))
const TodoType=SyncComponent(()=>import("./setting/base/message/TodoType"))

const LogTemplate=SyncComponent(()=>import("./setting/base/log/LogTemplate"))
const LogType=SyncComponent(()=>import("./setting/base/log/LogType"))

const MessageSendTypeTrue=SyncComponent(()=>import("./setting/base/message/MessageSendType"))
const MessageType=SyncComponent(()=>import("./setting/base/message/MessageType"))
const SystemMessageNotice=SyncComponent(()=>import("./setting/base/message/SystemMessageNotice"))
const ProjectMessageNotice=SyncComponent(()=>import("./setting/base/message/ProjectMessageNotice"))

export {
    easStore,
    App,
    SettingContent,
    Portal,
    SyncComponent,

    Logout,
    Login,
    ExcludeProductUser,
    Wechat,
    Layout,

    NotFound,
    NoAccess,

    WidgetWork,
    Oplog,
    Todo,

    Setting,
    SettingHome,
    OrgaManagement,
    UserManagement,
    PortalDirectory,
    UserGroupPage,

    SystemRole,
    MessageSendType,
    MessageNotice,
    PluginList,
    LogListPage,
    DataImport,
    BackupRestore,
    VersionPage,
    ProductAuth,

    SystemFeature,
    SystemRoleTrue,
    ProjectRole,
    ProjectFeature,
    ProjectVirtualRole,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType,
    LogTemplate,
    LogType,
    MessageSendTypeTrue,
    MessageType,
    SystemMessageNotice,
    ProjectMessageNotice
}
