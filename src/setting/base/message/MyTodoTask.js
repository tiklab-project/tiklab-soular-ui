import React from "react";
import {MyTodoTask} from "tiklab-message-ui";

/**
 * 待办
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MyTodoTaskContent = props =>{

    return <MyTodoTask {...props} bgroup={"soular"}/>

}

export default MyTodoTaskContent
