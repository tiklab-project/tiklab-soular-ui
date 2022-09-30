/**
 * @name: GetPullToRefreshlData
 * @author mahai
 * @date 2022/9/27 4:30 PM
 * @description GetPullToRefreshlData
 */
import React, { useEffect, useState } from "react";
import {getUser, parseUserSearchParams} from 'tiklab-core-ui';
import { InfiniteScroll, PullToRefresh, List } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import todoServer from "../../../service/todoServer";
import opLogServer from "../../../service/opLogServer";
import messageServer from "../../../service/messageServer";

const GetPullToRefreshlData = (props) => {
    const { itemKey, classFix } = props;

    const [data, setData] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const [pageSize] = useState(50);
    const [hasMore, setHasMore] = useState(true);

    useEffect(async () => {
        setData([]);
        // await getNextData(classFix, itemKey, currentPage);
    }, [itemKey, classFix]);

    const getNextData = async (classFix, itemKey, isNext = true) => {
        let data = {
            list:[],
            total:0
        }
        let params = {
            pageParam:{
                pageSize:pageSize,
                currentPage:isNext ? currentPage + 1 : 1
            }
        }
        if (itemKey !== 'all' && classFix !== 'message') {
            params['bgroup'] = itemKey;
            params['userId'] = getUser().userId;
        } else {
            params['application'] = itemKey;
            params['receiver'] = getUser().userId;
        }
        let response;
        switch (classFix) {
            case 'todo':
                response = await todoServer.getTodoPage(params);
               if (response.code === 0) {
                   data.list = response.data.dataList
                   data.total = response.data.totalRecord

               }
               break;
            case 'oplog':
                response = await opLogServer.getOplogPage(params);
                if (response.code === 0) {
                    data.list = response.data.dataList
                    data.total = response.data.totalRecord
                }
                break;
            case 'message':
                response = await messageServer.getMessageList(params);
                if (response.code === 0) {
                    data.list = response.data.dataList
                    data.total = response.data.totalRecord
                }
                break;
        }
        if (isNext) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage( 1)
        }
        return data;
    }

    const loadMore = async () => {
        const append = await getNextData(classFix, itemKey, true);
        setData([...data, ...append.list]);
        setHasMore([...data, ...append.list].length > append.total);
    };

    const messageRouter = (item) => {
        const {messageTemplate} = item;
        const reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
        if (reg.test(messageTemplate.link)) {
            window.open(messageTemplate.link+"?" + parseUserSearchParams(getUser()))
        } else {
            history.push(messageTemplate.link)
        }
    }

    const logRouter = (item) => {
        const {opLogTemplate} = item;
        if (opLogTemplate.link) {
            window.open(opLogTemplate.link+"?" + parseUserSearchParams(getUser()))
        }
    }

    const showTypeList = (module) => {
        switch (module) {
            case 'todo':
                return (
                    <List>
                        {data.map((item, index) => (
                            <List.Item key={index} description={item.remark}>
                                {item.title}
                            </List.Item>
                        ))}
                    </List>
                )
            case 'oplog':
                return (
                    <List>
                        {data.map((item, index) => (
                            <List.Item key={item.id} description={item.module} onClick={() => logRouter(item)}>
                                <div dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}/>
                            </List.Item>
                        ))}
                    </List>
                )
            case 'message':
                return (
                    <List>
                        {data.map((item, index) => {
                            let jsonData = {
                                title:item.messageTemplate.title,
                                status:item.status,
                                receiveTime:item.receiveTime
                            }
                            return(
                                <List.Item key={item.id} description={item.module} onClick={() => messageRouter(item)}>
                                    {
                                        jsonData.title
                                    }
                                </List.Item>
                            )
                        })}
                    </List>
                )

        }
    }

    return (
        <div className={classFix+'_refresh'}>
            <PullToRefresh
                key={itemKey}
                onRefresh={async () => {
                    await sleep(1000);
                    const append = await getNextData(classFix, itemKey, false);
                    setData(append.list);
                    setHasMore([...data, ...append.list].length > append.total);
                }}
            >
                {
                    showTypeList(classFix)
                }
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
        </div>
    );
};

export default GetPullToRefreshlData;
