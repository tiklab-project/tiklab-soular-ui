/**
 * @name: management
 * @author: mahai
 * @date: 2021-05-06 15:50
 * @description：消息管理
 * @update: 2021-05-06 15:50
 */
import React from 'react';
import {MessageNotice} from "tiklab-message-ui";


const MessageNoticeContent = props => {

    return(
        <MessageNotice {...props} bgroup={'soular'}/>
    )
}
export default MessageNoticeContent
