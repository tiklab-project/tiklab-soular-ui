import React from "react";
import {
    MacCommandOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    LayoutOutlined,
    VerifiedOutlined,
    MergeCellsOutlined
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
            icon :<SafetyCertificateOutlined/>,
        },
        {
            id:'message',
            title: '消息',
            icon :<SoundOutlined/>,
            children: [
                {
                    id:'/setting/Message',
                    title: '消息通知方案',
                },
                {
                    id:'/setting/messagesendtype',
                    title: '消息发送方式',
                }
            ]
        },
        {
            id:'/setting/Plugin',
            title: '插件',
            purviewCode:'plugin',
            icon :<MergeCellsOutlined />,
        },
        {
            id:'integration',
            title: '系统集成',
            icon :<MacCommandOutlined />,
            children:[
                {
                    id:'/setting/data_import',
                    title: '用户导入',
                }
            ]
        },
        {
            id:'security',
            title: '安全',
            icon :<LayoutOutlined/>,
            children:[
                {
                    id:'/setting/backups',
                    title: '备份与恢复',
                    purviewCode:"restore",
                },
                {
                    id:'/setting/log',
                    title: '操作日志',
                    purviewCode:'log',
                },
            ]
        },
        {
            id:'/setting/Version',
            title: '版本与许可证',
            purviewCode:'version',
            icon :<VerifiedOutlined />,
        },
    ]

    return   <SystemContent
                {...props}
                applicationRouters={applicationRouters}
            />
}

export default Setting
