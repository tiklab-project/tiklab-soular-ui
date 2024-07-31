import React from "react";
import {
    MacCommandOutlined,
    SoundOutlined,
    LayoutOutlined,
    VerifiedOutlined,
    AppstoreOutlined, TeamOutlined
} from "@ant-design/icons";
import Aside from "../../common/aside/Aside";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const applicationRouters =  [
        {
            id: "user",
            title: "用户与权限",
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
                {
                    id:"/setting/permission",
                    title:"权限",
                    purviewCode:"permission",
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

    const templateRouter = [
        {
            id:'base',
            title: '基础数据',
            icon :<AppstoreOutlined/>,
            children:[
                {
                    id:'/setting/base/todotemplate',
                    title: '待办模板',
                },
                {
                    id:'/setting/base/todotype',
                    title: '待办类型',
                },
                {
                    id:'/setting/base/oplogtemplate',
                    title: '日志模板',
                },
                {
                    id:'/setting/base/systemfeature',
                    title: '系统功能',
                },
                {
                    id:'/setting/base/systemrole',
                    title: '系统角色',
                },
                {
                    id:'/setting/base/projectfeature',
                    title: '项目功能',
                },
                {
                    id:'/setting/base/projectrole',
                    title: '项目角色',
                },
                {
                    id:'/setting/base/vRole',
                    title: '项目虚拟角色',
                },
                {
                    id:'/setting/base/messageNotice',
                    title: '消息通知方案',
                },
                {
                    id:'/setting/base/messagesendtype',
                    title: '消息通知类型',
                },
                {
                    id:'/setting/base/messagetype',
                    title: '消息类型',
                },
                {
                    id:'/setting/base/oplogtype',
                    title: '日志类型',
                },
            ]
        }
    ]

    let menus = () =>{
        try{
            if(devProduction){
                return [...applicationRouters,...templateRouter]
            } else {
                return applicationRouters
            }
        }catch {
            return applicationRouters
        }
    }

    return (
        <Aside
            {...props}
            outerPath={"/setting"}
            applicationRouters={menus()}
        />
    )
}

export default Setting
