import {store as soularStore} from "./store";
import App from "./app";
import Portal from "./common/layout/Portal";
import SyncComponent from "./common/lazy/SyncComponent";

const Layout = SyncComponent(() => import('./common/layout/Layout'));

const Login = SyncComponent(() => import('./login/Login'));
const LoginRpw = SyncComponent(()=>import('./login/LoginRpw'));
const ExcludeProductUser = SyncComponent(() => import('./login/ExcludeProductUser'))
const Logout=SyncComponent(()=>import("./login/Logout"))

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
const Orga = SyncComponent(() => import('./setting/user/Orga'));
const User = SyncComponent(() => import('./setting/user/User'));
const Directory = SyncComponent(() => import('./setting/user/Directory'));
const UserGroup = SyncComponent(() => import('./setting/user/UserGroup'));


/**
 * 系统设置
 */
const Setting = SyncComponent(()=> import('./setting/navigator/setting'));

const SettingHome = SyncComponent(() => import('./setting/home/component/SettingHome'));

const MessageSendType = SyncComponent(() => import('./setting/message/MessageSendType'));
const MessageNotice = SyncComponent(() => import('./setting/message/MessageNotice'));

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
    soularStore,
    App,
    Portal,
    SyncComponent,

    Logout,
    Login,
    LoginRpw,
    ExcludeProductUser,

    NotFound,
    NoAccess,

    Layout,

    WidgetWork,
    Oplog,
    Todo,

    Setting,
    SettingHome,

    Orga,
    User,
    Directory,
    UserGroup,

    SystemRole,
    MessageSendType,
    MessageNotice,
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
