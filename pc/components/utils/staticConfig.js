import {AppstoreOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";


const orgaMenuData = [
    {
        id:'1',
        key:'1',
        title: '组织管理',
        purviewCode:'s',
        icon :<SettingOutlined />,
    },{
        id:'2',
        key:'2',
        title: '用户管理',
        purviewCode:'c',
        icon :<AppstoreOutlined />
    },
    {
        id:'4',
        key:'4',
        title: '用户目录',
        purviewCode:'project-people',
        icon :<AppstoreOutlined />
    }
]


const  onSelectMenuSwitch = (history, key) => {
    switch (key) {
        case '1-1':
            history.push('/privilege/system-feature')
            break;
        case '1-2':
            history.push('/privilege/system-role')
            break;
        case '2-1':
            history.push('/privilege/project-feature')
            break;
        case '2-2':
            history.push('/privilege/project-system-role')
            break;
        case '2-3':
            history.push('/privilege/project-custom-role/')
            // history.push('/privilege/project-user/')
            break;
        case '6':
            history.push('/privilege/project-custom-role')
            break;
        case '7':
            history.push('/privilege/system-custom-role')
            break;
    }
}

const systemMenuData = [
    {
        id:'1',
        title: '系统权限',
        purviewCode:'system',
        icon :<AppstoreOutlined />,
        children:[{
            id:'1-1',
            title: '功能管理',
            purviewCode:'privilege_feature',
            icon :<AppstoreOutlined />,
        },{
            id:'1-2',
            title: '角色管理',
            purviewCode:'role-custom',
            icon :<AppstoreOutlined />,
        }]
    },
    // {
    //     id: '2',
    //     title: '项目权限',
    //     purviewCode: 'project',
    //     children: [{
    //         id: '2-1',
    //         title: '功能管理',
    //         purviewCode: 'privilege_feature',
    //     }, {
    //         id: '2-2',
    //         title: '角色管理',
    //         purviewCode: 'role-custom'
    //     }, {
    //         id: '2-3',
    //         title: '项目角色管理',
    //         divider: true,
    //         purviewCode: 'project-role-custom'
    //     }]
    // },
    {
        id:'3',
        title: '消息中心',
        icon :<AppstoreOutlined />,
        children:[{
            id:'3-1',
            title: '消息管理',
            icon :<AppstoreOutlined />,
            purviewCode:'message-management'
        },{
            id:'3-2',
            title: '消息模板管理',
            icon :<AppstoreOutlined />,
            purviewCode:'message-template'
        },{
            id:'3-3',
            title: '消息发送方式',
            icon :<AppstoreOutlined />,
            purviewCode:'message-type'
        },{
            id:'3-4',
            title: '消息类型管理',
            icon :<AppstoreOutlined />,
            purviewCode:'message-service'
        }]
    },{
        id:'4',
        key:'4',
        purviewCode:'plugin',
        title: '插件管理',
        icon :<SettingOutlined />,
    },
    {
        id:'5',
        key:'5',
        purviewCode:'license',
        title: 'License管理',
        icon :<SettingOutlined />,
    }
]

const onSystemMenu = (history, key) => {
    switch (key) {
    case '1-1':
        history.push('/system/feature')
        break;
    case '1-2':
        history.push('/system/role')
        break;
    // case '2-1':
    //     history.push('/system/projectfeature')
    //     break;
    // case '2-2':
    //     history.push('/system/projectrole')
    //     break;
    // case '2-3':
    //     history.push('/system/projectrolecustom')
    //     break;
    case '3-1':
        history.push('/system/message')
        break;
    case '3-2':
        history.push('/system/messagetype')
        break;
    case '3-3':
        history.push('/system/messagesendtype')
        break;
    case '3-4':
        history.push('/system/messagetemplate')
        break;
    case '4':
        history.push('/system/plugin')
        break;
    case '5':
        history.push('/system/license')
        break;
    }


}

export {
    systemMenuData,
    onSelectMenuSwitch,
    onSystemMenu,
    orgaMenuData,
}
