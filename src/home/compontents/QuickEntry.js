import React, {useEffect, useState} from "react";
import {
    findAllGroup,
    findUserPage,
    findOrgaTree,
    findRolePage
} from "../store/store";
import "./QuickEntry.scss";

/**
 * 工作台，应用
 */
const QuickEntry = props => {

    const {history} = props

    // 用户总数
    const [userLength,setUserLength] = useState(0);
    // 部门总数
    const [orgLength,setOrgLength] = useState(0);
    // 用户组总数
    const [groupLength,setGroupLength] = useState(0);
    // 权限角色总数
    const [roleLength,setRoleLength] = useState(0);

    const pageParam =  {
        pageSize:13,
        currentPage: 1,
    }

    useEffect(()=>{
        // 获取权限角色总数
        findRolePage(pageParam).then(res=>{
            if(res.code===0){
                setRoleLength(res.data.totalRecord)
            }
        })
        // 获取用户总数
        findUserPage(pageParam).then(res=>{
            if(res.code===0){
                setUserLength(res.data.totalRecord)
            }
        })
        // 获取用户组总数
        findAllGroup().then(res=>{
            if(res.code===0){
                if(res.data?.length>0){
                    setGroupLength(res.data.length)
                }
            }
        })
        // 获取部门总数
        findOrgaTree().then(res=>{
            if(res.code===0){
                if(res.data?.length>0){
                    setOrgLength(res.data.length)
                }
            }
        })
    },[])

    const toSetting = (path) => {
        history.push(`/setting/${path}`)
    }

    return(
        <div className='quick-entry'>
            <div className='quick-entry-title'>
                常用
            </div>
            <div className='quick-entry-content'>
                <div className='quick-entry-item' onClick={()=>toSetting('orga')}>
                    <div>{orgLength || 0}</div>
                    <div>部门</div>
                </div>
                <div className='quick-entry-item' onClick={()=>toSetting('user')}>
                    <div>{userLength || 0}</div>
                    <div>用户</div>
                </div>
                <div className='quick-entry-item' onClick={()=>toSetting('userGroup')}>
                    <div>{groupLength || 0}</div>
                    <div>用户组</div>
                </div>
                <div className='quick-entry-item' onClick={()=>toSetting('dir')}>
                    <div>3</div>
                    <div>用户目录</div>
                </div>
                <div className='quick-entry-item' onClick={()=>toSetting('permission')}>
                    <div>{roleLength || 0}</div>
                    <div>权限</div>
                </div>
            </div>
        </div>
    )
};

export default QuickEntry

