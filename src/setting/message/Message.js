/**
 * @Description:
 * @Author: gaomengyuan
 * @Date: 2025/8/19
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/8/19
 */
import React from "react";
import {Message} from "tiklab-message-ui";

const MessageContent = props =>{

    return (
        <Message
            {...props}
            bgroup={"soular"}
        />
    )

}

export default MessageContent
