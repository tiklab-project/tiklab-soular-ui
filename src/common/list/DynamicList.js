import React from "react";
import {applyJump} from "tiklab-core-ui";
import Profile from "../profile/Profile";
import ListEmpty from "./ListEmpty";
import moment from "moment";
import "./DynamicList.scss";

/**
 * 动态列表
 */
const DynamicList = props =>{

    const {dynamicList} = props

    /**
     * 动态路由跳转
     * @param item
     */
    const goDynaLink = item =>{
        if(item.link){
            applyJump(item.link)
        }
    }

    return (
        <div className="soular-dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                    dynamicList.map((item,index)=> {
                        const {loggingList,time} = item;
                        return (
                            <div key={index} className='dynamic-item'>
                                <div className='dynamic-item-time'>
                                    <span>{time}</span>
                                </div>
                                {
                                    loggingList && loggingList.map(logItem=>{
                                        const {actionType,action,user,createTime,data,id} = logItem
                                        let dataObj;
                                        try {
                                            dataObj = data && JSON.parse(data);
                                        } catch (error) {
                                            dataObj = {};
                                        }
                                        return (
                                            <div key={id} className='dynamic-item-log soular-user-avatar'>
                                                <div className='dynamic-item-log-time'>
                                                    {moment(createTime).format("HH:mm")}
                                                </div>
                                                <Profile userInfo={user}/>
                                                <div className='dynamic-item-log-info'>
                                                    <div onClick={()=>goDynaLink(logItem)} className='dynamic-item-log-info-name'>
                                                        {user?.nickname || user?.name}{actionType?.name}
                                                    </div>
                                                    <div className='dynamic-item-log-desc'>
                                                        <div className='log-desc-action'> {action}</div>
                                                        {
                                                            dataObj?.message &&
                                                            <div className='log-desc-message' title={dataObj.message}>
                                                                {dataObj.message}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                    :
                    <ListEmpty />
            }
        </div>
    )
}

export default DynamicList
