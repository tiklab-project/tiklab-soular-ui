import App from "./app";
import SettingContent from "./setting/Navigator/SettingContent";
import SyncComponent from "./common/lazy/SyncComponent";
import Portal from "./common/layout/Portal";

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./Login/ExcludeProductUser'))
const Logout = SyncComponent(()=>import("./login/Logout"))
const Wechat = SyncComponent(()=>import("./login/Wechat"))

const UserLayout = SyncComponent(()=>import('./user/navigator/UserAside'))

const SettingLayout = SyncComponent(()=> import('./setting/Navigator/setting'));

/**
 * 首页工作台
 */
const Home = SyncComponent(() => import('./home/compontents/HomePage'))

const OplogFull = SyncComponent(()=>import('./home/compontents/OplogFull'))

const NotFound = SyncComponent(()=>import('./setting/Privilege/NotFound'))

/**
 * 用户管理
 */
const OrgaManagement = SyncComponent(() => import('./user/user/OrgaManagement'));
const UserManagement = SyncComponent(() => import('./user/user/UserManagement'));
const PortalDirectory = SyncComponent(() => import('./user/user/Directory'));
const UserGroupPage = SyncComponent(() => import('./user/user/UserGroupPage'))

/**
 * 系统设置
 */
const SystemRole = SyncComponent(() => import('./setting/Privilege/SystemRolePage'));
const MessageSendType = SyncComponent(() => import('./setting/Message/MessageSendTypePage'));
const MessageManagement = SyncComponent(() => import('./setting/Message/Management'));
const PluginList = SyncComponent(() => import('./setting/Plugin/Plugin'))
const VersionPage = SyncComponent(() => import('./setting/Version'));

const LogListPage = SyncComponent(()=> import('./setting/Secuity/LogList'))
const DataImport = SyncComponent(()=>import('./setting/integration/dataImport/components/DataImport'))

const BackupRecovery = SyncComponent(()=>import('./setting/Secuity/BackupRecovery'))

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

    Login,
    ExcludeProductUser,
    Wechat,
    Logout,

    UserLayout,
    SettingLayout,

    Home,
    OplogFull,

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
