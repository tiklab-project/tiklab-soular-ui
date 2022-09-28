/**
 * @name: todolist
 * @author mahai
 * @date 2022/9/28 9:49 AM
 * @description todolist
 */
import React, {useState, useEffect, useRef} from "react";
import { NavBar, Tabs, Swiper,} from 'antd-mobile'
import {TabItems} from '../../constant';

import './todoList.scss';
import GetPullToRefreshlData from "../work/components/GetPullToRefreshlData";

const Todolist = ({history}) => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(()=>{

    },[]);


    const onGoBack = () => {
        history.goBack()
    }
    return(
        <div className={'todo'}>
            <NavBar
                backArrow={true}
                onBack={onGoBack}
            >
                任务待办
            </NavBar>
            <div className={'todo_sticky'}>
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
            <div className={'todo_wrap'}>
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
                                    <div className={'todo_content'}>
                                        <GetPullToRefreshlData itemKey={item.key} classFix={'todo'}/>
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
export default Todolist;
