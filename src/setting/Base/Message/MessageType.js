/**
 * @name: messageType
 * @author: mahai
 * @date: 2021-05-06 15:55
 * @description：消息类型
 * @update: 2021-05-06 15:55
 */
import React from 'react';
import {MessageType as DarthMessageType} from "thoughtware-message-ui";
// import {MessageType as DarthMessageType} from '../../../../src/components'
const MessageType = props => {

    return(
        <DarthMessageType {...props} />
    )
}
export default MessageType;
