import App from "./app";
import SettingContent from "./setting/navigator/SettingContent";
import SyncComponent from "./common/lazy/SyncComponent";
import Portal from "./common/layout/Portal";

const Layout = SyncComponent(() => import('./common/layout/Layout'));

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./login/ExcludeProductUser'))
const Logout = SyncComponent(()=>import("./login/Logout"))
const Wechat = SyncComponent(()=>import("./login/Wechat"))

const SettingLayout = SyncComponent(()=> import('./setting/navigator/Setting'));

/**
 * 首页工作台
 */
const WidgetWork = SyncComponent(() => import('./home/compontents/WidgetWork'))

/**
 * 待办
 */
const Todo = SyncComponent(() => import('./home/compontents/TodoFull'))

const OplogFull = SyncComponent(()=>import('./home/compontents/OplogFull'))

const NotFound = SyncComponent(()=>import('./setting/privilege/NotFound'))

/**
 * 用户管理
 */
const OrgaManagement = SyncComponent(() => import('./setting/user/OrgaManagement'));
const UserManagement = SyncComponent(() => import('./setting/user/UserManagement'));
const PortalDirectory = SyncComponent(() => import('./setting/user/Directory'));
const UserGroupPage = SyncComponent(() => import('./setting/user/UserGroupPage'))

/**
 * 系统设置
 */
const SystemRole = SyncComponent(() => import('./setting/privilege/SystemRolePage'));
const MessageSendType = SyncComponent(() => import('./setting/message/MessageSendTypePage'));
const MessageManagement = SyncComponent(() => import('./setting/message/Management'));
const PluginList = SyncComponent(() => import('./setting/plugin/Plugin'))
const VersionPage = SyncComponent(() => import('./setting/licence/Version'));

const LogListPage = SyncComponent(()=> import('./setting/secuity/LogList'))
const DataImport = SyncComponent(()=>import('./setting/integration/dataImport/components/DataImport'))

const BackupRecovery = SyncComponent(()=>import('./setting/secuity/BackupRecovery'))

/**
 * 基础数据
 */
const TodoTemplate = SyncComponent(()=> import('./setting/Base/Todo/todoTemp'));
const BaseTodoTypePage =  SyncComponent(()=> import('./setting/Base/Todo/todoTypePage'));
const BaseSystemFeature = SyncComponent(() => import('./setting/Base/Privilege/BaseSystemFeature'));
const BaseSystemRole = SyncComponent(() => import('./setting/Base/Privilege/BaseSystemRole'));
const BaseProjectFeature = SyncComponent(() => import('./setting/Base/Privilege/BaseProjectFeature'));
const BaseProjectRole = SyncComponent(() => import('./setting/Base/Privilege/BaseProjectRole'));
const BaseDomainRole = SyncComponent(() => import('./setting/Base/Privilege/BaseDomainRole'));
const MessageSendTypeBase = SyncComponent(() => import('./setting/Base/Message/MessageSendType'));
const MessageType = SyncComponent(() => import('./setting/Base/Message/MessageType'));
const BaseOplogTypePage = SyncComponent(() => import('./setting/Base/Secuity/oplogTypePage'));
const BaseMessageNoticePage = SyncComponent(() => import('./setting/Base/Message/MessageNoticePage'));
const BaseDomainUserPage = SyncComponent(() => import('./setting/Base/User/domainUserPage'));
const BaseLogTemplate = SyncComponent(()=>import('./setting/Base/Secuity/LogTemplate'))


export {
    App,
    SettingContent,
    Portal,
    SyncComponent,

    Layout,
    Login,
    ExcludeProductUser,
    Wechat,
    Logout,

    SettingLayout,

    WidgetWork,
    OplogFull,
    Todo,

    NotFound,

    OrgaManagement,
    UserManagement,
    PortalDirectory,
    UserGroupPage,
    SystemRole,
    MessageSendType,
    MessageManagement,
    PluginList,
    VersionPage,
    LogListPage,
    DataImport,

    BackupRecovery,

    TodoTemplate,
    BaseTodoTypePage,
    BaseSystemFeature,
    BaseSystemRole,
    BaseProjectFeature,
    BaseProjectRole,
    BaseDomainRole,
    MessageSendTypeBase,
    MessageType,
    BaseOplogTypePage,
    BaseMessageNoticePage,
    BaseDomainUserPage,
    BaseLogTemplate
}
