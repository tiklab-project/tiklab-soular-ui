import React from "react";
import {
    MacCommandOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    LayoutOutlined,
    VerifiedOutlined,
    MergeCellsOutlined,
    TeamOutlined
} from "@ant-design/icons";
import SettingContent from "./SettingContent";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const applicationRouters =  [
        {
            id:'user',
            title: '用户与权限',
            icon :<TeamOutlined/>,
            children: [
                {
                    title:"部门",
                    id:"/setting/orga",
                    purviewCode:'orga',
                },
                {
                    title:"用户",
                    id:"/setting/user",
                    purviewCode:'user',
                },
                {
                    title:"用户组",
                    id: "/setting/userGroup",
                    purviewCode:'user_group',
                },
                {
                    title:"用户目录",
                    id:"/setting/dir",
                    purviewCode:'user_dir',
                },
                {
                    id:'/setting/permission',
                    title: '权限',
                    purviewCode:'permission',
                },
            ]
        },
        {
            id:'message',
            title: '消息',
            icon :<SoundOutlined/>,
            children: [
                {
                    id:'/setting/message',
                    title: '消息通知方案',
                },
                {
                    id:'/setting/messagesendtype',
                    title: '消息发送方式',
                }
            ]
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
            id:'licence',
            title: '应用',
            icon :<VerifiedOutlined />,
            children:[
                {
                    id:'/setting/version',
                    title: '版本与许可证',
                    purviewCode:'version',
                },
                {
                    id:'/setting/productAuth',
                    title: '应用访问权限',
                },
            ]
        },
    ]

    return   <SettingContent
                {...props}
                applicationRouters={applicationRouters}
            />
}

export default Setting
