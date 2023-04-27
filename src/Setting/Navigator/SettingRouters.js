import React from "react";
import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";

const applicationRouters =  [
    {
        id:'1',
        title: '用户与部门',
        icon :<SettingOutlined/>,
        children:[
            {
                id:'/setting/orga',
                title: '部门',
                purviewCode:'orga',
                icon :<SettingOutlined/>,
            },
            {
                id:'/setting/user',
                title: '用户',
                purviewCode:'user',
                icon :<SettingOutlined/>,
            },
            {
                id:'/setting/userGroup',
                title: '用户组',
                purviewCode:'user_group',
                icon :<SettingOutlined/>,
            },
            {
                id:'/setting/dir',
                title: '用户目录',
                purviewCode:'user_dir',
                icon :<SettingOutlined/>,
            }]
    },
    {
        id:'/setting/permission',
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
                id:'/setting/Message',
                title: '消息通知方案',
                icon :<SettingOutlined/>,
            },
            {
                id:'/setting/messagesendtype',
                title: '消息发送方式',
                icon :<SettingOutlined/>,
            }
        ]
    },
    {
        id:'/setting/Plugin',
        title: '插件',
        purviewCode:'plugin',
        icon :<SettingOutlined/>,
    },
    {
        id:'6',
        title: '安全',
        icon :<SettingOutlined/>,
        children:[{
            id:'/setting/log',
            title: '操作日志',
            purviewCode:'log',
            icon :<SettingOutlined/>,
        }]
    },
    {
        id:'/setting/Version',
        title: '版本与许可证',
        purviewCode:'version',
        icon :<SettingOutlined/>,
    },
    {
        id:'/setting/ProductAuth',
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
            id:'/setting/base/todotemplate',
            title: '待办模板',
            icon :<AppstoreOutlined/>,
            purviewCode:'user',
        },{
            id:'/setting/base/oplogtemplate',
            title: '日志模板',
            icon :<AppstoreOutlined/>,
            purviewCode:'user',
        },
            {
                id:'/setting/base/systemfeature',
                title: '系统功能',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/systemrole',
                title: '系统权限',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/messagesendtype',
                title: '消息通知类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/messagetype',
                title: '消息类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/formList',
                title: '表单列表',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },{
                id:'/setting/base/preliminaryList',
                title: '字段',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },{
                id:'/setting/base/preliminaryTypeList',
                title: '字段类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/oplogtype',
                title: '日志类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/todotype',
                title: '待办类型',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/messageNotice',
                title: '消息通知方案',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/projectfeature',
                title: '项目功能',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/projectrole',
                title: '项目角色',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/domainUserList',
                title: '项目用户自定义',
                icon :<AppstoreOutlined/>,
                purviewCode:'user',
            },
            {
                id:'/setting/base/domainRole',
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
