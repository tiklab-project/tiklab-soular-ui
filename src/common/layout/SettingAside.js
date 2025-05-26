import React, {useState} from "react";
import {
    LayoutOutlined,
    MacCommandOutlined,
    SafetyCertificateOutlined,
    ScheduleOutlined,
    SoundOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import Aside from "../component/aside/Aside";
import {SecurityEnhance} from "tiklab-security-ui";
import {LicenceEnhance} from "tiklab-licence-ui";
import ipRoster from "../../assets/images/soular-feature-ipRoster.png";
import customLogo from "../../assets/images/soular-feature-customLogo.png";

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
        title: '集成与开放',
        icon :<MacCommandOutlined />,
        children:[
            {
                id:'/setting/data_import',
                title: '用户导入',
            },
            {
                id:"/setting/openApi",
                title: "openApi",
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
                purviewCode:"restore",
            },
            {
                id:'/setting/log',
                title: '操作日志',
                purviewCode:'log',
            },
            {
                id:"/setting/ipRoster",
                title: "IP黑白名单",
                isEnhance: true,
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
            },
            {
                id:'/setting/productAuth',
                title: '系统访问权限',
            },
            {
                id:'/setting/customLogo',
                title: '系统Logo',
                isEnhance: true,
            },
        ]
    },
]

const SettingAside = (props) => {


    //licence增强功能弹出框
    const [licenceVisible,setLicenceVisible] = useState(false);
    //security增强功能弹出框
    const [securityVisible,setSecurityVisible] = useState(false);

    /**
     * 引导订阅
     * @param data
     */
    const enhance = data => {
        const {id} = data;
        if(id==='/setting/customLogo'){
            setLicenceVisible(true)
        }
        if(id==='/setting/ipRoster'){
            setSecurityVisible(true)
        }
    }


    return (
        <Aside
            {...props}
            enhance={enhance}
            outerPath={"/setting"}
            applicationRouters={applicationRouters}
        >
            <SecurityEnhance
                visible={securityVisible}
                setVisible={setSecurityVisible}
                bgroup={'sward'}
                list={[
                    {id:'ipRoster',title:'IP黑白名单',icon:ipRoster}
                ]}
            />
            <LicenceEnhance
                visible={licenceVisible}
                setVisible={setLicenceVisible}
                bgroup={'sward'}
                list={[
                    {id:'logo',title:'自定义Logo',icon:customLogo}
                ]}
            />
        </Aside>
    )

}

export default SettingAside
