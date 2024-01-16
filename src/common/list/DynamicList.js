import React from "react";
import {Empty} from "antd";
import {withRouter} from "react-router";
import Profile from "../profile/Profile";
import messageEmpty from "../../assets/message.svg";
import "./DynamicList.scss";

/**
 * 动态列表
 */
const DynamicList = props =>{

    const {dynamicList} = props

    // 动态路由跳转
    const goDynaLink = item =>{
        if(item.link){
            props.history.push(item.link.split("#")[1])
        }
    }

    return (
        <div className="eas-dynamic-center">
            {
                dynamicList && dynamicList.length>0 ?
                    dynamicList.map(item=> {
                        const {actionType,action,user,createTime,data} = item
                        const dataObj = data && JSON.parse(data)
                        return (
                            <div key={item.id} className="dynamic-item" onClick={()=>goDynaLink(item)}>
                                <div className="dynamic-item-data">
                                    <Profile
                                        userInfo={user}
                                    />
                                    <div className='item-data-info'>
                                        <div className='item-data-info-name'>{user?.nickname || user?.name} {actionType?.name}</div>
                                        <div className='item-data-info-desc'>
                                            <div className='desc-action'> {action}</div>
                                            {
                                                dataObj?.message &&
                                                <div className='desc-message'>{dataObj.message}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="dynamic-item-time">{createTime}</div>
                            </div>
                        )
                    })
                    :
                    <Empty
                        imageStyle={{
                            height: 120,
                        }}
                        description={<span style={{color:"#999",fontSize:13}}>没有动态</span>}
                        image={messageEmpty}
                    />
            }
        </div>
    )
}

export default withRouter(DynamicList)
