import React,{useEffect,useState} from "react";
import {renderRoutes} from "react-router-config";
import {
    DeploymentUnitOutlined,
    TeamOutlined,
    GroupOutlined,
    SolutionOutlined
} from "@ant-design/icons";
import {SystemNav,PrivilegeButton} from "tiklab-privilege-ui";
import "./UserAside.scss";

/**
 * 左侧路由（二级标题）
 */
const UserAside = props =>{

    const {route,location} = props

    const path = location.pathname
    const [nav,setNav] = useState("")

    useEffect(()=>{
        setNav(path)
    },[path])

    const firstRouters = [
        {
            icon:<DeploymentUnitOutlined />,
            title:"部门",
            id:"/user/orga",
            purviewCode:'orga',
        },
        {
            icon:<TeamOutlined />,
            title:"用户",
            id:"/user/user",
            purviewCode:'user',
        },
        {
            icon :<GroupOutlined/>,
            title:"用户组",
            id: "/user/userGroup",
            purviewCode:'user_group',
        },
        {
            icon :<SolutionOutlined/>,
            title:"用户目录",
            id:"/user/dir",
            purviewCode:'user_dir',
        },
    ]

    return(
        <div className="eas-user-layout">
            <SystemNav
                {...props}
                applicationRouters={firstRouters}
                outerPath={"/user"}
                notFoundPath={"/404"}
            >
                <div className="eas-user-normal-aside">
                    {
                        firstRouters.map(item=>(
                            <PrivilegeButton key={item.id} code={item.purviewCode} {...props}>
                                <div key={item.id}
                                     className={`normal-aside-item ${nav===item.id ? "normal-aside-select":""}`}
                                     onClick={()=>props.history.push(item.id)}
                                >
                                    <div className="normal-aside-item-icon">{item.icon}</div>
                                    <div className="normal-aside-item-title">{item.title}</div>
                                </div>
                            </PrivilegeButton>
                        ))
                    }
                </div>
            </SystemNav>
            <div className='eas-user-layout-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default UserAside
