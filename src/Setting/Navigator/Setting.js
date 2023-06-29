import React from "react";
import {
    SettingOutlined,
} from "@ant-design/icons";
import SystemContent from "./SettingContent";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

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
            children:[
                {
                    id:'/setting/log',
                    title: '操作日志',
                    purviewCode:'log',
                    icon :<SettingOutlined/>,
                },
                {
                    id:'/setting/data_import',
                    title: '数据导入',
                    icon :<SettingOutlined/>,
                }
            ]
        },
        {
            id:'/setting/Version',
            title: '版本与许可证',
            purviewCode:'version',
            icon :<SettingOutlined/>,
        }
    ]

    return   <SystemContent
                {...props}
                applicationRouters={applicationRouters}
            />
}

export default Setting
