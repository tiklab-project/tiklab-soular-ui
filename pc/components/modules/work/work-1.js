/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {useState, useEffect}  from 'react';
import {getUser, parseUserSearchParams} from 'doublekit-core-ui'
import {projectImg, apiboxImg, jenkinsImg, knowledgeImg} from 'doublekit-eam-ui'
import { Col, Row, Card } from 'antd';
import {LinkOutlined, SettingOutlined} from "@ant-design/icons";

import AddWorkBench from "./components/workBenchAdd";
import WorkService from './service/workService'
import './work.scss'

const { Meta } = Card;



const INIT_WORK = [
    {
        appType: 'apibox',
        label: "API BOX",
        description: "接口自动化测试",
        img:apiboxImg,
        appUrl:"",
        id:"1"
    },
    {
        appType: 'project',
        label: "项目管理",
        description: "项目管理系统",
        img:projectImg,
        appUrl:"",
        id:"2"
    },
    {
        appType: 'jtest',
        label: "Jtest",
        description: "Jtest系统",
        img:knowledgeImg,
        appUrl:"",
        id:"3"
    },
    {
        appType: 'wiki',
        label: "知识库",
        description: "知识库系统",
        img:knowledgeImg,
        appUrl:"",
        id:"4"
    },
    {
        appType: 'pipleine',
        label: "自动化部署",
        description: "自动化部署系统",
        img:jenkinsImg,
        appUrl:"",
        id:"5"
    },
]

const Work = (props) => {
    const [applications, setApplications] = useState([]);
    const [visible, setVisible] = useState(false);
    const [edit,setEdit] = useState(null);

    const user = getUser();
    useEffect(() => {
        getWorkList().then(r => {})
    }, [])



    const getWorkList = async () => {
        const data = await WorkService.getWorkList();
        const updateData = INIT_WORK.map(item => {
            const code = item.appType;
            const index= data.findIndex(d => d.appType === code);
            if (index>-1) {
                return {
                    ...item,
                    appUrl:data[index].appUrl,
                    id: data[index].id,
                }
            }
            return item
        })
        setApplications(updateData)
    }

    const onEdit = (item) => {
        setEdit(item);
        setVisible(true)
    }

    return (
        <div className={'work'}>
            <Row  gutter={[0,16]}>
                {
                    applications.map(item => {
                        const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;
                        return (
                            <Col span={8} key={item.id} style={{display:"flex", justifyContent:"center"}}>
                                <Card
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt={item.label}
                                            src={item.img}
                                            height={180}
                                        />
                                    }
                                    actions={
                                        item.appUrl ? [
                                            <SettingOutlined key="setting" onClick={() => onEdit(item)}/>,
                                            <a href={url} target='_blank'>
                                                <LinkOutlined key="link"/>
                                            </a>
                                        ] : [
                                            <SettingOutlined key="setting" onClick={() => onEdit(item)}/>,
                                        ]
                                    }
                                >
                                    <Meta
                                        title={item.label}
                                        description={item.description}
                                    />
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <AddWorkBench
                visible={visible}
                setVisible={() => {
                    setVisible(false);
                    getWorkList()
                }}
                edit={edit}
            />
        </div>
    )
}
export default Work
