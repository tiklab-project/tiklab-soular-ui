/**
 * @name: messageWidget
 * @author mahai
 * @date 2022/6/16 10:40 AM
 * @description messageWidget
 */

import React from "react";

import './messageWidget.scss';


const MessageWidget = () => {

    return(
        <div className={'messageWidget'}>
            <div className={'messageWidget-card'}>
                <div className="messageWidget-card-body">
                    <div className="messageWidget-card-body-header">
                        <div className="messageWidget-card-body-header-title">最新消息</div>
                    </div>
                    <div className="messageWidget-card-body-header-content">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageWidget
