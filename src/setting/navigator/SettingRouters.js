import React from "react";
import {AppstoreOutlined} from "@ant-design/icons";

// 基础数据路由
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
            {
                id:'/setting/base/messageNotice',
                title: '消息通知方案',
            },
        ]
    }
]

export {
    templateRouter
}
