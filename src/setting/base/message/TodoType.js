import React from "react";
import {TodoType} from "thoughtware-message-ui";

/**
 * 待办类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoTypeContent = props =>{

    return <TodoType {...props} bgroup={"eas"}/>

}

export default TodoTypeContent