import React from "react";
import {
    LayoutOutlined,
    MacCommandOutlined,
    SafetyCertificateOutlined,
    ScheduleOutlined,
    SoundOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import Aside from "../component/aside/Aside";

const applicationRouters =  [
    {
        id: "user",
        title: "用户",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/setting/user",
                title: "用户",
                purviewCode: "user",
            },
            {
                id: "/setting/orga",
                title: "部门",
                purviewCode: "orga",
            },
            {
                id: "/setting/userGroup",
                title: "用户组",
                purviewCode: "user_group",
            },
            {
                id: "/setting/dir",
                title: "用户目录",
                purviewCode: "user_dir",
            },
        ]
    },
    {
        id:"/setting/permission",
        title:"权限",
        purviewCode:"permission",
        icon :<ScheduleOutlined />,
    },
    {
        id:'/setting/message',
        title: '消息',
        icon :<SoundOutlined/>,
        purviewCode:"message",
    },
    {
        id:'integration',
        title: '集成开放',
        icon :<MacCommandOutlined />,
        children:[
            {
                id:'/setting/data_import',
                title: '用户导入',
                purviewCode:"user_import_add",
            },
            {
                id:"/setting/openApi",
                title: "OpenApi",
                purviewCode:"openapi",
            },
        ]
    },
    {
        id:'security',
        title: '安全',
        icon :<SafetyCertificateOutlined/>,
        children:[
            {
                id:'/setting/backups',
                title: '备份与恢复',
                purviewCode:"backups_and_recover",
            },
        ]
    },
    {
        id:'licence',
        title: '系统',
        icon :<LayoutOutlined />,
        children:[
            {
                id:'/setting/version',
                title: '版本与许可证',
                purviewCode:"licence",
            },
            {
                id:'/setting/productAuth',
                title: '系统访问权限',
                purviewCode:"apply_limits",
            },
        ]
    },
]

const SettingAside = (props) => {

    return (
        <Aside
            {...props}
            applicationRouters={applicationRouters}
        >
        </Aside>
    )

}

export default SettingAside
