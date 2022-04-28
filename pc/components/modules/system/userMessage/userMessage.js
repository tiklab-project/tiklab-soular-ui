/**
 * @name: userMessage
 * @author: mahai
 * @date: 2021-05-06 15:56
 * @description：用户信息
 * @update: 2021-05-06 15:56
 */
import React from 'react';
import {UserMessage as DarthUserMessage} from "doublekit-message-ui";


const UserMessage = props => {

    return(
        <DarthUserMessage {...props} />
    )
}
export default UserMessage
