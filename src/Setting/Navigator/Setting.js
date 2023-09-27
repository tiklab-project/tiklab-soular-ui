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
            id:'/setting/permission',
            title: '权限',
            purviewCode:'permission',
            icon :<SettingOutlined/>,
        },
        {
            id:'message',
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
            id:'integration',
            title: '系统集成',
            icon :<SettingOutlined/>,
            children:[
                {
                    id:'/setting/data_import',
                    title: '用户导入',
                    icon :<SettingOutlined/>,
                }
            ]
        },
        {
            id:'security',
            title: '安全',
            icon :<SettingOutlined/>,
            children:[
                {
                    id:'/setting/backups',
                    title: '备份与恢复',
                    icon :<SettingOutlined/>,
                    purviewCode:"restore",
                },
                {
                    id:'/setting/log',
                    title: '操作日志',
                    purviewCode:'log',
                    icon :<SettingOutlined/>,
                },
            ]
        },
        {
            id:'/setting/Version',
            title: '版本与许可证',
            purviewCode:'version',
            icon :<SettingOutlined/>,
        },
    ]

    return   <SystemContent
                {...props}
                applicationRouters={applicationRouters}
            />
}

export default Setting
