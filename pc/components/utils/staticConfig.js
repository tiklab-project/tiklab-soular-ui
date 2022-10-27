import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

const selectionSettingMenuData = () => {
    const devMenu =  [
        {
            id:'1',
            title: '成员与部门',
            icon :<AppstoreOutlined />,
            children:[{
                id:'1-1',
                title: '部门',
                purviewCode:'sys_orga',
                icon :<AppstoreOutlined />,
            },{
                id:'1-2',
                title: '用户',
                icon :<AppstoreOutlined />,
            },
            {
                id:'1-3',
                title: '用户目录',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'2',
            title: '权限',
            icon :<AppstoreOutlined />,
        },
        {
            id:'3',
            title: '消息通知',
            icon :<AppstoreOutlined />,
        },
        {
            id:'4',
            title: '待办任务',
            icon :<AppstoreOutlined />,
        },
        {
            id:'5',
            key:'5',
            title: '插件',
            icon :<SettingOutlined />,
        },
        {
            id:'6',
            key:'6',
            title: '安全',
            icon :<SettingOutlined />,
            children:[{
                id:'6-1',
                title: '操作日志',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'7',
            key:'7',
            title: '版本与许可证',
            icon :<SettingOutlined />,
        },
        {
            id:'8',
            title: '基础数据',
            icon :<AppstoreOutlined />,
            children:[{
                id:'8-1',
                title: '待办模板',
                icon :<AppstoreOutlined />,
            },{
                id:'8-2',
                title: '日志模板',
                icon :<AppstoreOutlined />,
            },
            {
                id:'8-3',
                title: '系统功能点',
                icon :<AppstoreOutlined />,
            },
            {
                id:'8-4',
                title: '项目功能点',
                icon :<AppstoreOutlined />,
            },
            {
                id:'8-5',
                title: '消息模板',
                icon :<AppstoreOutlined />,
            },
            {
                id:'8-6',
                title: '消息发送方式',
                icon :<AppstoreOutlined />,
            },
            {
                id:'8-8',
                title: '消息类型',
                icon :<AppstoreOutlined />,
            }
            ]
        },
    ];
    const prodMenu =  [
        {
            id:'1',
            title: '成员与部门',
            purviewCode:'sys_permission',
            icon :<AppstoreOutlined />,
            children:[{
                id:'1-1',
                title: '部门',
                purviewCode:'sys_orga',
                icon :<AppstoreOutlined />,
            },{
                id:'1-2',
                title: '用户',
                purviewCode:'sys_user',
                icon :<AppstoreOutlined />,
            },
                {
                    id:'1-3',
                    title: '用户目录',
                    purviewCode:'sys_directory',
                    icon :<AppstoreOutlined />,
                }]
        },
        {
            id:'2',
            title: '权限',
            purviewCode:'sys_permission',
            icon :<AppstoreOutlined />,
        },
        {
            id:'3',
            title: '消息通知',
            purviewCode:'sys_message_center',
            icon :<AppstoreOutlined />,
        },
        {
            id:'4',
            title: '待办任务',
            purviewCode:'todo_list',
            icon :<AppstoreOutlined />,
        },
        {
            id:'5',
            key:'5',
            purviewCode:'plugin',
            title: '插件',
            icon :<SettingOutlined />,
        },
        {
            id:'6',
            key:'6',
            purviewCode:'widget',
            title: '安全',
            icon :<SettingOutlined />,
            children:[{
                id:'8-1',
                title: '操作日志',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'7',
            key:'7',
            purviewCode:'licence',
            title: '版本与许可证',
            icon :<SettingOutlined />,
        },
    ];
    return dev_production ? devMenu : prodMenu
}


const onSettingMenu = (history, key) => {
    const isDev = dev_production;
    if (isDev) {
        switch (key) {
            case '1-1':
                history.push('/setting/orga')
                break;
            case '1-2':
                history.push('/setting/user')
                break;
            case '1-3':
                history.push('/setting/dir')
                break;
            case '2':
                history.push('/setting/permission')
                break;
            case '3':
                history.push('/setting/message')
                break;
            case '4':
                history.push('/setting/todotask')
                break;
            case '5':
                history.push('/setting/plugin')
                break;
            case '6-1':
                history.push('/setting/log')
                break;
            case '7':
                history.push('/setting/version')
                break;
            case '8-1':
                history.push('/setting/todotemplate')
                break;
            case '8-2':
                history.push('/setting/oplogtemplate')
                break;
            case '8-3':
                history.push('/setting/systemfeature')
                break;
            case '8-4':
                history.push('/setting/projectfeature')
                break;
            case '8-5':
                history.push('/setting/messagesendtype')
                break;
            case '8-6':
                history.push('/setting/messagetype')
                break;
        }
    } else {
        switch (key) {
            case '1-1':
                history.push('/setting/orga')
                break;
            case '1-2':
                history.push('/setting/user')
                break;
            case '1-3':
                history.push('/setting/dir')
                break;
            case '2':
                history.push('/setting/permission')
                break;
            case '3':
                history.push('/setting/message')
                break;
            case '4':
                history.push('/setting/todotask')
                break;
            case '5':
                history.push('/setting/plugin')
                break;
            case '6-1':
                history.push('/setting/log')
                break;
            case '7':
                history.push('/setting/version')
                break;
        }
    }
}

const settingMenuData = selectionSettingMenuData()
export {
    settingMenuData,
    onSettingMenu,
}
