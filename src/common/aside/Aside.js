import React,{useState} from "react";
import {DownOutlined,UpOutlined} from "@ant-design/icons";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import {SYSTEM_ROLE_STORE} from "thoughtware-privilege-ui/es/store";
import {SystemNav,PrivilegeButton} from "thoughtware-privilege-ui";
import back from '../../assets/back.svg';
import "./Aside.scss";

/**
 * 系统设置页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Aside = props =>{

    const {outerPath,route,applicationRouters,systemRoleStore} = props

    const {systemPermissions} = systemRoleStore

    let path = props.location.pathname


    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([""])

    /**
     * 路由跳转
     * @param data
     * @returns {*}
     */
    const select = data => props.history.push(data.id)

    const isExpandedTree = key => expandedTree.some(item => item ===key)

    /**
     * 展开 || 闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li style={{cursor:"pointer",paddingLeft:deep}}
                    className={`system-aside-li system-aside-second ${data.id=== path ? "system-aside-select":""}`}
                    onClick={()=>select(data)}
                    key={data.id}
                >
                    <div>
                        {data?.icon && <span className="sys-content-icon">{data.icon}</span>}
                        <span className='aside-second-title'>{data.title}</span>
                    </div>
                </li>
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep) =>{
        return(
            <li key={item.id} className="system-aside-li">
                <div className="system-aside-item system-aside-first"
                     style={{paddingLeft: deep}}
                     onClick={()=>setOpenOrClose(item.id)}
                >
                    <div>
                        {item?.icon && <span className="sys-content-icon">{item.icon}</span>}
                        <span className="system-aside-title">{item.title}</span>
                    </div>
                    <div className="system-aside-item-icon">
                        {
                            item.children ?
                                (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: "10px"}}/> :
                                        <UpOutlined style={{fontSize: "10px"}}/>
                                ): ""
                        }
                    </div>
                </div>
                <ul className={`system-aside-ul ${isExpandedTree(item.id) ? null: "system-aside-hidden"}`}>
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep + 20
                            return item.children && item.children.length ?
                                renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep)=> {
        const isCode = item.children.some(list=>!list.purviewCode)
        if(isCode) return subMenu(item,deep)
        const isPromise = item.children.some(list=> systemPermissions.includes(list.purviewCode))
        return isPromise && subMenu(item,deep)
    }

    return (
        <SystemNav
            {...props}
            applicationRouters={applicationRouters}
            expandedTree={expandedTree}
            setExpandedTree={setExpandedTree}
            outerPath={outerPath}
            noAccessPath={"/noaccess"}
        >
            <div className="system">
                <div className="system-aside">
                    <ul className="system-aside-top">
                        <li className='system-aside-top-head'>
                            <span className='top-head-icon' onClick={()=>props.history.push('/work')}>
                                <img src={back} width={19} height={19} alt={''}/>
                            </span>
                            <span className='top-head-text'>设置</span>
                        </li>
                        {
                            applicationRouters.map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,30) : renderMenu(firstItem,30)
                            })
                        }
                    </ul>
                </div>
                <div className="system-content">
                    { renderRoutes(route.routes) }
                </div>
            </div>
        </SystemNav>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(Aside))
