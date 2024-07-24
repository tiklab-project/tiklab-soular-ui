import React from "react";
import Aside from "../../../common/aside/Aside";

const UserNav = props =>{

    const applicationRouters =  [
        {
            title:"部门",
            id:"/user/orga",
            purviewCode:'orga',
        },
        {
            title:"用户",
            id:"/user/user",
            purviewCode:'user',
        },
        {
            title:"用户组",
            id: "/user/userGroup",
            purviewCode:'user_group',
        },
        {
            title:"用户目录",
            id:"/user/dir",
            purviewCode:'user_dir',
        },
        {
            id:'/user/permission',
            title: '权限',
            purviewCode:'permission',
        },
    ]

    return (
        <Aside
            {...props}
            outerPath={"/user"}
            applicationRouters={applicationRouters}
        />
    )
}

export default UserNav
