import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

const selectionSettingMenuData = () => {
    const devMenu =  [
        {
            id:'1',
            title: '用户与部门',
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
            },
            {
                id:'1-4',
                title: '用户组',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            }
            ]
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
                    title: '消息通知方案',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
            ]
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
                id:'8-8',
                title: '消息通知类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-9',
                title: '消息类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-10',
                title: '表单列表',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },{
                id:'8-11',
                title: '字段',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },{
                id:'8-12',
                title: '字段类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-13',
                title: '日志类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-14',
                title: '待办类型',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },
            {
                id:'8-15',
                title: '消息通知方案',
                icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
            },

                {
                    id:'8-17',
                    title: '项目功能',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
                {
                    id:'8-18',
                    title: '项目角色',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
                {
                    id:'8-16',
                    title: '项目用户自定义',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
                {
                    id:'8-19',
                    title: '项目角色自定义',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                },
            ]
        },
    ];
    const prodMenu =  [
        {
            id:'1',
            title: '用户与部门',
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
                },
                {
                    id:'1-4',
                    title: '用户组',
                    icon :<AppstoreOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>,
                }
                ]
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
                history.push('/Setting/orga')
                break;
            case '1-2':
                history.push('/Setting/User')
                break;
            case '1-3':
                history.push('/Setting/dir')
                break;
            case '1-4':
                history.push('/Setting/userGroup')
                break;
            case '2':
                history.push('/Setting/permission')
                break;
            case '3-1':
                history.push('/Setting/messagesendtype')
                break;
            case '3-2':
                history.push('/Setting/Message')
                break;
            case '5':
                history.push('/Setting/Plugin')
                break;
            case '6-1':
                history.push('/Setting/log')
                break;
            case '7':
                history.push('/Setting/Version')
                break;
            case '8-1':
                history.push('/Setting/Base/todotemplate')
                break;
            case '8-2':
                history.push('/Setting/Base/oplogtemplate')
                break;
            case '8-3':
                history.push('/Setting/Base/systemfeature')
                break;
            case '8-4':
                history.push('/Setting/Base/systemrole')
                break;
            case '8-8':
                history.push('/Setting/Base/messagesendtype')
                break;
            case '8-9':
                history.push('/Setting/Base/messagetype')
                break;
            case '8-10':
                history.push('/Setting/Base/formList')
                break;
            case '8-11':
                history.push('/Setting/Base/preliminaryList')
                break;
            case '8-12':
                history.push('/Setting/Base/preliminaryTypeList')
                break;
            case '8-13':
                history.push('/Setting/Base/oplogtype')
                break;
            case '8-14':
                history.push('/Setting/Base/todotype')
                break;
            case '8-15':
                history.push('/Setting/Base/messageNotice')
                break;
            case '8-16':
                history.push('/Setting/Base/domainUserList')
                break;
            case '8-17':
                history.push('/Setting/Base/projectfeature')
                break;
            case '8-18':
                history.push('/Setting/Base/projectrole')
                break;
            case '8-19':
                history.push('/Setting/Base/domainRole')
                break;
        }
    } else {
        switch (key) {
            case '1-1':
                history.push('/Setting/orga')
                break;
            case '1-2':
                history.push('/Setting/User')
                break;
            case '1-3':
                history.push('/Setting/dir')
                break;
            case '1-4':
                history.push('/Setting/userGroup')
                break;
            case '2':
                history.push('/Setting/permission')
                break;
            case '3-1':
                history.push('/Setting/messagesendtype')
                break;
            case '3-2':
                history.push('/Setting/Message')
                break;
            case '5':
                history.push('/Setting/Plugin')
                break;
            case '6-1':
                history.push('/Setting/log')
                break;
            case '7':
                history.push('/Setting/Version')
                break;

        }
    }
}

const settingMenuData = selectionSettingMenuData()
export {
    settingMenuData,
    onSettingMenu,
}
