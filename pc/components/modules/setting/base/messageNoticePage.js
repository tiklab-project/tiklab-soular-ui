/**
 * @name: messageNoticePage
 * @author mahai
 * @date 2022/12/12 9:39 AM
 * @description messageNoticePage
 */
import React from 'react';
import {MessageNotice} from "tiklab-message-ui";

const MessageNoticePage = props => {

    return(
        <MessageNotice {...props} isBase={true}/>
    )
}
export default MessageNoticePage
