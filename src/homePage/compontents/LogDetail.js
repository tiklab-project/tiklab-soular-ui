import React from "react";
import {LeftOutlined} from "@ant-design/icons";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {Descriptions, Space} from "antd";
import {ProductsTitle} from './Common'
import TitleAction from "../../common/titleAction";
import './LogDetail.scss'


const LogDetail = props => {

    const {data, history, closeDetailPage} = props

    const {link} = data;
    const changRouter = () => {
        if (link) {
            if(/^http|https/.test(link)){
                window.open(link+"?" + parseUserSearchParams({
                    ticket:getUser().ticket
                }))
            }
        }
    }

    const goBack = () => {
        closeDetailPage()
    }

    return(
        <div className='tiklab-oplog-details'>
            <div className='tiklab-oplog-details-content'>
                <TitleAction
                    title={'动态详情'}
                    icon={
                        <LeftOutlined
                            onClick={goBack}
                            style={{fontSize:'var(--tiklab-icon-size-16)'}}
                        />
                    }
                />
                <Descriptions labelStyle={{justifyContent: 'flex-start',minWidth:100}}>
                    <Descriptions.Item label="摘要" span={3}>{data.abstractContent}</Descriptions.Item>
                    <Descriptions.Item label="操作人" span={3}>{data.user?.nickname || '--'}</Descriptions.Item>
                    <Descriptions.Item label="类型" span={3}>{data.module}</Descriptions.Item>
                    <Descriptions.Item label="模块" span={3}>{ProductsTitle(data.bgroup)}</Descriptions.Item>
                    <Descriptions.Item label="时间" span={3}>{data.createTime}</Descriptions.Item>
                    <Descriptions.Item label="内容" span={3}>
                        <Space direction={"vertical"}>
                            <div dangerouslySetInnerHTML={{__html: data.data}}/>
                            {
                                link && <div className='tiklab-oplog-details-text' onClick={changRouter} >详情</div>
                            }
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
};
export default LogDetail;
