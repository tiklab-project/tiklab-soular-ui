import React from "react";
import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";

const applicationRouters =  [
    {
        id:'1',
        title: '用户与部门',
        icon :<SettingOutlined/>,
        children:[{
            id:'/Setting/orga',
            title: '部门',
            purviewCode:'orga',
            icon :<SettingOutlined/>,
        },{
            id:'/Setting/User',
            title: '用户',
            purviewCode:'user',
            icon :<SettingOutlined/>,
        },
            {
                id:'/Setting/userGroup',
                title: '用户组',
                purviewCode:'user_group',
                icon :<SettingOutlined/>,
            },
            {
                id:'/Setting/dir',
                title: '用户目录',
                purviewCode:'user_dir',
                icon :<SettingOutlined/>,
            }]
    },
    {
        id:'/Setting/permission',
        title: '权限',
        purviewCode:'permission',
        icon :<SettingOutlined/>,
    },
    {
        id:'3',
        title: '消息',
        icon :<SettingOutlined/>,
        children: [
            {
                id:'/Setting/Message',
                title: '消息通知方案',
                purviewCode:'message_notice',
                icon :<SettingOutlined/>,
            },
            {
                id:'/Setting/messagesendtype',
                title: '消息发送方式',
                purviewCode:'message_send_type',
                icon :<SettingOutlined/>,
            }
        ]
    },
    {
        id:'/Setting/Plugin',
        title: '插件',
        purviewCode:'plugin',
        icon :<SettingOutlined/>,
    },
    {
        id:'6',
        title: '安全',
        icon :<SettingOutlined/>,
        children:[{
            id:'/Setting/log',
            title: '操作日志',
            purviewCode:'log',
            icon :<SettingOutlined/>,
        }]
    },
    {
        id:'/Setting/Version',
        title: '版本与许可证',
        purviewCode:'version',
        icon :<SettingOutlined/>,
    },
    {
        id:'/Setting/ProductAuth',
        title: '应用授权',
        purviewCode:'product_auth',
        icon :<SettingOutlined/>,
    },
]

// 基础数据路由
const templateRouter = [
    {
        id:'8',
        title: '基础数据',
        icon :<AppstoreOutlined/>,
        children:[{
            id:'/Setting/Base/todotemplate',
            title: '待办模板',
            icon :<AppstoreOutlined/>,
            purviewCode:'user',
        },{
            id:'/Setting/Base/oplogtemplate',
            title: '日志模板',
            icon :<AppstoreOutlined/>,
            purviewCode:'user',
        },
            {
                id:'/Setting/Base/systemfeature',
                title: '系统功能',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/systemrole',
                title: '系统权限',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/messagesendtype',
                title: '消息通知类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/messagetype',
                title: '消息类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/formList',
                title: '表单列表',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },{
                id:'/Setting/Base/preliminaryList',
                title: '字段',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },{
                id:'/Setting/Base/preliminaryTypeList',
                title: '字段类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/oplogtype',
                title: '日志类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/todotype',
                title: '待办类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/messageNotice',
                title: '消息通知方案',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/projectfeature',
                title: '项目功能',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/projectrole',
                title: '项目角色',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/domainUserList',
                title: '项目用户自定义',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/Setting/Base/domainRole',
                title: '项目角色自定义',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            }]
    }
]

export {
    applicationRouters,
    templateRouter
}
