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


const selectionSystemMenuData = () => {
    const devMenu =  [
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
            },
                {
                    id:'1-3',
                    title: '项目功能管理',
                    purviewCode:'sys_feature',
                    icon :<AppstoreOutlined />,
                },{
                    id:'1-4',
                    title: '项目角色管理',
                    purviewCode:'sys_role',
                    icon :<AppstoreOutlined />,
                }
            ]
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
            purviewCode:'oplog',
            title: '日志',
            icon :<SettingOutlined />,
            children:[{
                id:'8-1',
                title: '日志列表',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined />,
            },{
                id:'8-2',
                title: '我的日志',
                purviewCode:'my_oplog',
                icon :<AppstoreOutlined />,
            },{
                id:'8-3',
                title: '日志模板',
                purviewCode:'oplog_template',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'5',
            title: '任务',
            purviewCode:'todo',
            icon :<AppstoreOutlined />,
            children:[{
                id:'5-1',
                title: '任务待办',
                purviewCode:'todo_list',
                icon :<AppstoreOutlined />,
            },{
                id:'5-2',
                title: '我的任务待办',
                purviewCode:'my_todo',
                icon :<AppstoreOutlined />,
            },{
                id:'5-3',
                title: '待办模板',
                purviewCode:'todo_template',
                icon :<AppstoreOutlined />,
            }]
        },
    ];
    const prodMenu =  [
        {
            id:'1',
            title: '系统权限',
            purviewCode:'sys_permission',
            icon :<AppstoreOutlined />,
            children:[
                {
                    id:'1-3',
                    title: '项目功能管理',
                    purviewCode:'sys_feature',
                    icon :<AppstoreOutlined />,
                },{
                    id:'1-4',
                    title: '项目角色管理',
                    purviewCode:'sys_role',
                    icon :<AppstoreOutlined />,
                }
            ]
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
            purviewCode:'oplog',
            title: '日志',
            icon :<SettingOutlined />,
            children:[{
                id:'8-1',
                title: '日志列表',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined />,
            },{
                id:'8-2',
                title: '我的日志',
                purviewCode:'my_oplog',
                icon :<AppstoreOutlined />,
            },{
                id:'8-3',
                title: '日志模板',
                purviewCode:'oplog_template',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'5',
            title: '任务',
            purviewCode:'todo',
            icon :<AppstoreOutlined />,
            children:[{
                id:'5-1',
                title: '任务待办',
                purviewCode:'todo_list',
                icon :<AppstoreOutlined />,
            },{
                id:'5-2',
                title: '我的任务待办',
                purviewCode:'my_todo',
                icon :<AppstoreOutlined />,
            },{
                id:'5-3',
                title: '待办模板',
                purviewCode:'todo_template',
                icon :<AppstoreOutlined />,
            }]
        },
    ];
    return dev_production ? devMenu : prodMenu
}


const onSystemMenu = (history, key) => {
    const isDev = dev_production;
    if (isDev) {
        switch (key) {
            case '1-1':
                history.push('/system/feature')
                break;
            case '1-2':
                history.push('/system/role')
                break;
            case '1-3':
                history.push('/system/project_feature')
                break;
            case '1-4':
                history.push('/system/project_role')
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

            case '8-1':
                history.push('/system/logs')
                break;
            case '8-2':
                history.push('/system/mylog')
                break;
            case '8-3':
                history.push('/system/logtemplate')
                break;
        }
    } else {
        switch (key) {
            case '1-3':
                history.push('/system/project_feature')
                break;
            case '1-4':
                history.push('/system/project_role')
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

            case '8-1':
                history.push('/system/logs')
                break;
            case '8-2':
                history.push('/system/mylog')
                break;
            case '8-3':
                history.push('/system/logtemplate')
                break;
        }
    }
}

const systemMenuData = selectionSystemMenuData()
export {
    systemMenuData,
    onSystemMenu,
    orgaMenuData,
}
