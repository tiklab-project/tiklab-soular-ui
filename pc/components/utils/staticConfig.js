import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

const selectionSettingMenuData = () => {
    const devMenu =  [
        {
            id:'1',
            title: '成员与部门',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children:[{
                id:'1-1',
                title: '部门',
                purviewCode:'orga',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },{
                id:'1-2',
                title: '用户',
                purviewCode:'user',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'1-3',
                title: '用户目录',
                purviewCode:'user_dir',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            }]
        },
        {
            id:'2',
            title: '权限',
            purviewCode:'permission',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'3',
            key:'3',
            title: '消息',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children: [
                {
                    id:'3-1',
                    key:'3-1',
                    title: '消息发送方式',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
                {
                    id:'3-2',
                    key:'3-2',
                    title: '消息通知',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
            ]
        },
        {
            id:'4',
            key:'4',
            title: '待办任务',
            purviewCode:'todotask',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'5',
            key:'5',
            title: '插件',
            purviewCode:'plugin',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'6',
            key:'6',
            title: '安全',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children:[{
                id:'6-1',
                title: '操作日志',
                purviewCode:'log',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            }]
        },
        {
            id:'7',
            key:'7',
            title: '版本与许可证',
            purviewCode:'version',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'8',
            title: '基础数据',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children:[{
                id:'8-1',
                title: '待办模板',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },{
                id:'8-2',
                title: '日志模板',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-3',
                title: '系统功能',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-4',
                title: '系统权限',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-7',
                title: '消息模板',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-8',
                title: '消息发送方式',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-9',
                title: '消息类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            }
            ]
        },
    ];
    const prodMenu =  [
        {
            id:'1',
            title: '成员与部门',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children:[{
                id:'1-1',
                title: '部门',
                purviewCode:'sys_orga',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },{
                id:'1-2',
                title: '用户',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
                {
                    id:'1-3',
                    title: '用户目录',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                }]
        },
        {
            id:'2',
            title: '权限',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'3',
            title: '消息',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children: [
                {
                    id:'3-1',
                    title: '消息发送方式',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
                {
                    id:'3-2',
                    title: '消息通知',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
            ]
        },

        {
            id:'4',
            title: '待办任务',
            icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'5',
            key:'5',
            title: '插件',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
        },
        {
            id:'6',
            key:'6',
            title: '安全',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            children:[{
                id:'6-1',
                title: '操作日志',
                purviewCode:'oplog_list',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            }]
        },
        {
            id:'7',
            key:'7',
            title: '版本与许可证',
            icon :<SettingOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
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
            case '3-1':
                history.push('/setting/messagesendtype')
                break;
            case '3-2':
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
                history.push('/setting/base/todotemplate')
                break;
            case '8-2':
                history.push('/setting/base/oplogtemplate')
                break;
            case '8-3':
                history.push('/setting/base/systemfeature')
                break;
            case '8-4':
                history.push('/setting/base/systemrole')
                break;
            case '8-7':
                history.push('/setting/base/messagetemplate')
                break;
            case '8-8':
                history.push('/setting/base/messagesendtype')
                break;
            case '8-9':
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
            case '3-1':
                history.push('/setting/messagesendtype')
                break;
            case '3-2':
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
