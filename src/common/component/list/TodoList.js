import React from "react";
import {applyJump} from "tiklab-core-ui";
import Profile from "../profile/Profile";
import ListEmpty from "./ListEmpty";
import './TodoList.scss';

const TodoList = (props) => {

    const {todoList} = props

    // 动态路由跳转
    const goTodoLink = item =>{
        if(item.link){
            applyJump(item.link)
        }
    }

    return (
        <div className='soular-todo-center'>
            {
                todoList && todoList.length > 0?
                    todoList.map(item=>{
                        const {todoType,action,createUser,createTime} = item
                        return (
                            <div key={item.id} className="todo-item soular-user-avatar" onClick={()=>goTodoLink(item)}>
                                <div className="todo-item-data">
                                    <Profile userInfo={createUser}/>
                                    <div className='item-data-info'>
                                        <div className='item-data-info-name'>{createUser?.nickname || createUser?.name} {todoType?.name}</div>
                                        <div className='item-data-info-desc'>
                                            <div className='desc-action'> {action}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="todo-item-time">{createTime}</div>
                            </div>
                        )
                    })
                    :
                    <ListEmpty />
            }
        </div>
    )
}

export default TodoList
