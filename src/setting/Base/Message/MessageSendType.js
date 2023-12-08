/**
 * @name: sendType
 * @author: mahai
 * @date: 2021-05-06 15:53
 * @description：消息发送类型
 * @update: 2021-05-06 15:53
 */
import React from 'react';
import {MessageSendType} from "thoughtware-message-ui";


const MessageSendTypePage = props => {

    return(
        <MessageSendType {...props} isBase={true}/>
    )
}
export default MessageSendTypePage
