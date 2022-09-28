/**
 * @name: todolist
 * @author mahai
 * @date 2022/9/28 9:49 AM
 * @description todolist
 */
import React, {useState, useRef} from "react";
import { NavBar, Tabs, Swiper,} from 'antd-mobile'

import {TabItems} from '../../constant';
import GetPullToRefreshlData from "../work/components/GetPullToRefreshlData";

import './oplog.scss';

const Oploglist = ({history}) => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0)


    const onGoBack = () => {
        history.goBack()
    }
    return(
        <div className={'oplog'}>
            <NavBar
                backArrow={true}
                onBack={onGoBack}
            >
                日志列表
            </NavBar>
            <div className={'oplog_sticky'}>
                <Tabs
                    activeKey={TabItems[activeIndex].key}
                    onChange={key => {
                        const index = TabItems.findIndex(item => item.key === key)
                        setActiveIndex(index)
                        swiperRef.current?.swipeTo(index)
                    }}
                >
                    {TabItems.map(item => (
                        <Tabs.Tab title={item.title} key={item.key} />
                    ))}
                </Tabs>
            </div>
            <div className={'oplog_wrap'}>
                <Swiper
                    direction='horizontal'
                    loop
                    indicator={() => null}
                    ref={swiperRef}
                    defaultIndex={activeIndex}
                    onIndexChange={index => {
                        setActiveIndex(index)
                    }}
                >
                    {
                        TabItems.map(item => {
                            return(
                                <Swiper.Item key={item.key}>
                                    <div className={'oplog_content'}>
                                        <GetPullToRefreshlData itemKey={item.key} classFix={'oplog'}/>
                                    </div>
                                </Swiper.Item>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}
export default Oploglist;
