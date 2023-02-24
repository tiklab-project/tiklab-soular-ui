/**
 * @name: LogDetail
 * @author mahai
 * @date 2023/2/10 5:26 PM
 * @description LogDetail
 */

import React from "react";
import {LeftOutlined} from "@ant-design/icons";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {Button, Descriptions, Space} from "antd";

import TitleAction from "../../../../../common/title-action";

const LogDetail = ({data, history, closeDetailPage, tagLabel}) => {
    const {link} = data;
    const changRouter = () => {

        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams(getUser()))
            } else{
                history.push(link)
            }
        }
    }

    const goBack = () => {
        closeDetailPage()
    }
    return(
        <div>
            <TitleAction
                title={'日志详情'}
                icon={
                    <LeftOutlined
                        onClick={goBack}
                        style={{fontSize:'var(--tiklab-icon-size-16)'}}
                    />
                }
            />
            <Descriptions labelStyle={{justifyContent: 'flex-end',minWidth:100}}>
                <Descriptions.Item label="摘要" span={3}>{data.abstractContent}</Descriptions.Item>
                <Descriptions.Item label="操作人" span={3}>{data.user.nickname}</Descriptions.Item>
                <Descriptions.Item label="日志类型" span={3}>{data.actionType.name}</Descriptions.Item>
                <Descriptions.Item label="模块" span={3}>{tagLabel(data.bgroup)}</Descriptions.Item>
                <Descriptions.Item label="时间" span={3}>{data.timestamp}</Descriptions.Item>
                <Descriptions.Item label="内容" span={3}>
                    <Space direction={"vertical"}>
                        <div dangerouslySetInnerHTML={{__html: data.data}}/>
                        {
                            link && <a onClick={changRouter} >详情</a>
                        }
                    </Space>
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
};
export default LogDetail;
