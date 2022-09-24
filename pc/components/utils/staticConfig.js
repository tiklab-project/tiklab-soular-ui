import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";


const orgaMenuData = [
    {
        id:'1',
        key:'1',
        title: '组织管理',
        purviewCode:'sys_orga',
        icon :<SettingOutlined />,
    },{
        id:'2',
        key:'2',
        title: '用户管理',
        purviewCode:'sys_user',
        icon :<AppstoreOutlined />
    },
    {
        id:'4',
        key:'4',
        title: '用户目录',
        purviewCode:'sys_directory',
        icon :<AppstoreOutlined />
    }
]


const  onSelectMenuSwitch = (history, key) => {
    switch (key) {
        case '1-1':
            history.push('/privilege/system-feature')
            break;
        case '1-2':
            history.push('/privilege/system-role')
            break;
        case '2-1':
            history.push('/privilege/project-feature')
            break;
        case '2-2':
            history.push('/privilege/project-system-role')
            break;
        case '2-3':
            history.push('/privilege/project-custom-role/')
            // history.push('/privilege/project-user/')
            break;
        case '6':
            history.push('/privilege/project-custom-role')
            break;
        case '7':
            history.push('/privilege/system-custom-role')
            break;
    }
}

const systemMenuData = [
    {
        id:'1',
        title: '系统权限',
        purviewCode:'sys_permission',
        icon :<AppstoreOutlined />,
        children:[{
            id:'1-1',
            title: '功能管理',
            purviewCode:'sys_feature',
            icon :<AppstoreOutlined />,
        },{
            id:'1-2',
            title: '角色管理',
            purviewCode:'sys_role',
            icon :<AppstoreOutlined />,
        }]
    },
    {
        id:'3',
        title: '消息中心',
        purviewCode:'sys_message_center',
        icon :<AppstoreOutlined />,
        children:[{
            id:'3-1',
            title: '消息管理',
            icon :<AppstoreOutlined />,
            purviewCode:'sys_message_management'
        },{
            id:'3-2',
            title: '消息类型管理',
            icon :<AppstoreOutlined />,
            purviewCode:'sys_message_type_management'
        },{
            id:'3-3',
            title: '消息发送方式',
            icon :<AppstoreOutlined />,
            purviewCode:'sys_message_type'
        },{
            id:'3-4',
            title: '消息模板管理',
            icon :<AppstoreOutlined />,
            purviewCode:'sys_message_template'
        }]
    },
    {
        id:'4',
        key:'4',
        purviewCode:'plugin',
        title: '插件管理',
        icon :<SettingOutlined />,
    },
    {
        id:'6',
        key:'6',
        purviewCode:'widget',
        title: 'Widget管理',
        icon :<SettingOutlined />,
    },

    {
        id:'8',
        key:'8',
        purviewCode:'widget',
        title: '日志列表',
        icon :<SettingOutlined />,
    },
    {
        id:'9',
        key:'9',
        purviewCode:'widget',
        title: '我的日志',
        icon :<SettingOutlined />,
    },
    {
        id:'5',
        title: '任务',
        purviewCode:'sys_permission',
        icon :<AppstoreOutlined />,
        children:[{
            id:'5-1',
            title: '任务待办',
            purviewCode:'sys_feature',
            icon :<AppstoreOutlined />,
        },{
            id:'5-2',
            title: '我的任务待办',
            purviewCode:'sys_role',
            icon :<AppstoreOutlined />,
        },{
            id:'5-3',
            title: '待办模板',
            purviewCode:'sys_role',
            icon :<AppstoreOutlined />,
        }]
    },
]

const onSystemMenu = (history, key) => {
    switch (key) {
    case '1-1':
        history.push('/system/feature')
        break;
    case '1-2':
        history.push('/system/role')
        break;
    case '3-1':
        history.push('/system/message')
        break;
    case '3-2':
        history.push('/system/messagetype')
        break;
    case '3-3':
        history.push('/system/messagesendtype')
        break;
    case '3-4':
        history.push('/system/messagetemplate')
        break;
    case '4':
        history.push('/system/plugin')
        break;
    case '5-1':
        history.push('/system/todotask')
        break;
    case '5-2':
        history.push('/system/mytodotask')
        break;
    case '5-3':
        history.push('/system/todotemp')
        break;
    case '6':
        history.push('/system/widgetMangent')
        break;

    case '8':
        history.push('/system/logs')
        break;
    case '9':
        history.push('/system/mylog')
        break;
    }

}

export {
    systemMenuData,
    onSelectMenuSwitch,
    onSystemMenu,
    orgaMenuData,
}
