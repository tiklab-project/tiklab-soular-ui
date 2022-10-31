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
                purviewCode:'orga',
                icon :<AppstoreOutlined />,
            },{
                id:'1-2',
                title: '用户',
                purviewCode:'user',
                icon :<AppstoreOutlined />,
            },
            {
                id:'1-3',
                title: '用户目录',
                purviewCode:'user_dir',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'2',
            title: '权限',
            purviewCode:'permission',
            icon :<AppstoreOutlined />,
        },
        // {
        //     id:'3',
        //     title: '项目权限',
        //     icon :<AppstoreOutlined />,
        // },
        {
            id:'4',
            title: '消息通知',
            purviewCode:'message',
            icon :<AppstoreOutlined />,
        },
        {
            id:'5',
            title: '待办任务',
            purviewCode:'todotask',
            icon :<AppstoreOutlined />,
        },
        {
            id:'6',
            key:'6',
            title: '插件',
            purviewCode:'plugin',
            icon :<SettingOutlined />,
        },
        {
            id:'7',
            key:'7',
            title: '安全',
            icon :<SettingOutlined />,
            children:[{
                id:'7-1',
                title: '操作日志',
                purviewCode:'log',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'8',
            key:'8',
            title: '版本与许可证',
            purviewCode:'version',
            icon :<SettingOutlined />,
        },
        {
            id:'9',
            title: '基础数据',
            icon :<AppstoreOutlined />,
            children:[{
                id:'9-1',
                title: '待办模板',
                icon :<AppstoreOutlined />,
            },{
                id:'9-2',
                title: '日志模板',
                icon :<AppstoreOutlined />,
            },
            {
                id:'9-3',
                title: '系统功能',
                icon :<AppstoreOutlined />,
            },
            {
                id:'9-4',
                title: '系统权限',
                icon :<AppstoreOutlined />,
            },
            // {
            //     id:'9-5',
            //     title: '项目功能',
            //     icon :<AppstoreOutlined />,
            // },
            // {
            //     id:'9-6',
            //     title: '项目权限',
            //     icon :<AppstoreOutlined />,
            // },
            {
                id:'9-7',
                title: '消息模板',
                icon :<AppstoreOutlined />,
            },
            {
                id:'9-8',
                title: '消息发送方式',
                icon :<AppstoreOutlined />,
            },
            {
                id:'9-9',
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
        // {
        //     id:'3',
        //     title: '项目权限',
        //     icon :<AppstoreOutlined />,
        // },
        {
            id:'4',
            title: '消息通知',
            icon :<AppstoreOutlined />,
        },
        {
            id:'5',
            title: '待办任务',
            icon :<AppstoreOutlined />,
        },
        {
            id:'6',
            key:'6',
            title: '插件',
            icon :<SettingOutlined />,
        },
        {
            id:'7',
            key:'7',
            title: '安全',
            icon :<SettingOutlined />,
            children:[{
                id:'7-1',
                title: '操作日志',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined />,
            }]
        },
        {
            id:'8',
            key:'8',
            title: '版本与许可证',
            icon :<SettingOutlined />,
        }
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
            // case '3':
            //     history.push('/setting/project/permission')
                break;
            case '4':
                history.push('/setting/message')
                break;
            case '5':
                history.push('/setting/todotask')
                break;
            case '6':
                history.push('/setting/plugin')
                break;
            case '7-1':
                history.push('/setting/log')
                break;
            case '8':
                history.push('/setting/version')
                break;
            case '9-1':
                history.push('/setting/base/todotemplate')
                break;
            case '9-2':
                history.push('/setting/base/oplogtemplate')
                break;
            case '9-3':
                history.push('/setting/base/systemfeature')
                break;
            case '9-4':
                history.push('/setting/base/systemrole')
                break;
            // case '9-5':
            //     history.push('/setting/base/projectfeature')
            //     break;
            // case '9-6':
            //     history.push('/setting/base/projectrole')
                break;
            case '9-7':
                history.push('/setting/base/messagetemplate')
                break;
            case '9-8':
                history.push('/setting/base/messagesendtype')
                break;
            case '9-9':
                history.push('/setting/base/messagetype')
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
                history.push('/setting/project/permission')
                break;
            case '4':
                history.push('/setting/message')
                break;
            case '5':
                history.push('/setting/todotask')
                break;
            case '6':
                history.push('/setting/plugin')
                break;
            case '7-1':
                history.push('/setting/log')
                break;
            case '8':
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
