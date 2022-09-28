/**
 * @name: work
 * @author mahai
 * @date 2022/9/28 9:35 AM
 * @description work
 */
import React from "react";

import {List, NavBar} from 'antd-mobile'
import {
    UnorderedListOutline,
    PayCircleOutline,
    SetOutline,
} from 'antd-mobile-icons';
import './work.scss';

const Work = ({history}) => {

    return(
        <div className={'dashboard'}>
            <NavBar
                backArrow={false}
            >
                工作台
            </NavBar>
            <List >
                <List.Item prefix={<UnorderedListOutline />} onClick={() => {history.push('/todolist')}}>
                    待办任务
                </List.Item>
                <List.Item prefix={<PayCircleOutline />} onClick={() => {history.push('/messagelist')}}>
                    消息列表
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={() => {history.push('/oploglist')}}>
                    日志列表
                </List.Item>
            </List>
        </div>

    )
}
export default Work;
