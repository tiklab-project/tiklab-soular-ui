import App from "./app";
import SettingContent from "./setting/Navigator/SettingContent";
import SyncComponent from "./common/lazy/SyncComponent";
import Portal from "./common/layout/Portal";

const Login = SyncComponent(() => import('./login/Login'))
const ExcludeProductUser = SyncComponent(() => import('./Login/ExcludeProductUser'))
const Logout = SyncComponent(()=>import("./login/Logout"))
const Wechat = SyncComponent(()=>import("./login/Wechat"))

/**
 * 首页工作台
 * @type {LazyComponent|*}
 */
const Home = SyncComponent(() => import('./home/compontents/HomePage'))

const OplogFull = SyncComponent(()=>import('./home/compontents/OplogFull'))

const NotFound = SyncComponent(()=>import('./setting/Privilege/NotFound'))

/**
 * 系统设置
 * @type {LazyComponent|*}
 */
const OrgaManagement = SyncComponent(() => import('./setting/User/OrgaManagement'));
const UserManagement = SyncComponent(() => import('./setting/User/UserManagement'));
const PortalDirectory = SyncComponent(() => import('./setting/User/Directory'));
const UserGroupPage = SyncComponent(() => import('./setting/User/UserGroupPage'))
const SystemRole = SyncComponent(() => import('./setting/Privilege/SystemRolePage'));
const MessageSendType = SyncComponent(() => import('./setting/Message/MessageSendTypePage'));
const MessageManagement = SyncComponent(() => import('./setting/Message/Management'));
const PluginList = SyncComponent(() => import('./setting/Plugin/Plugin'))
const VersionPage = SyncComponent(() => import('./setting/Version'));

const LogListPage = SyncComponent(()=> import('./setting/Secuity/log/LogList'))
const DataImport = SyncComponent(()=>import('./setting/Secuity/dataImport/components/DataImport'))


/**
 * 基础数据
 * @type {LazyComponent|*}
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
