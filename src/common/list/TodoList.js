import React from "react";
import {Empty} from "antd";
import {isPC,applyJump} from "thoughtware-core-ui";
import Profile from "../profile/Profile";
import messageEmpty from "../../assets/message.svg";
import './TodoList.scss';

const TodoList = (props) => {

    const {todoList} = props

    // 动态路由跳转
    const goTodoLink = item =>{
        if(item.link && isPC()){
            applyJump(item.link)
        }
    }

    const renderDescMessage = (dataObj,bgroup) => {
        switch (bgroup) {
            case 'matflow':
            case 'eas':
                return  dataObj?.message &&
                    <div className='desc-message'>{dataObj.message}</div>
            case 'kanass':
                return dataObj?.oldValue && dataObj?.newValue &&
                    <>
                        <div className='desc-message'>{dataObj?.oldValue?.name || dataObj?.oldValue?.nickname}</div>
                        <div className='desc-separato'/>
                        <div className='desc-message'>{dataObj?.newValue.name || dataObj?.newValue?.nickname}</div>
                    </>
        }
    }

    return (
        <div className='eas-todo-center'>
            {
                todoList && todoList.length > 0?
                    todoList.map(item=>{
                        const {todoType,action,createUser,createTime,data,bgroup} = item
                        // const dataObj = data && JSON.parse(data)
                        return (
                            <div key={item.id} className="todo-item" onClick={()=>goTodoLink(item)}>
                                <div className="todo-item-data">
                                    <Profile
                                        userInfo={createUser}
                                    />
                                    <div className='item-data-info'>
                                        <div className='item-data-info-name'>{createUser?.nickname || createUser?.name} {todoType?.name}</div>
                                        <div className='item-data-info-desc'>
                                            <div className='desc-action'> {action}</div>
                                            {
                                                // renderDescMessage(dataObj,bgroup)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="todo-item-time">{createTime}</div>
                            </div>
                        )
                    })
                    :
                    <Empty
                        imageStyle={{
                            height: 120,
                        }}
                        description={<span style={{color:"#999",fontSize:13}}>没有待办</span>}
                        image={messageEmpty}
                    />
            }
        </div>
    )
}

export default TodoList
