/**
 * @name: index
 * @author mahai
 * @date 2022/6/14 1:56 PM
 * @description 产品空间
 */
import React, {useState, useEffect} from "react";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import ProductWidgetsServer from "../products/api";
import apiboxImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import jenkinsImg from 'tiklab-eam-ui/es/assests/img/jenkins.png';
import knowledgeImg from 'tiklab-eam-ui/es/assests/img/apibox.png';
import projectImg from 'tiklab-eam-ui/es/assests/img/project.png';

import AppLinkManagement from './component/AppLinkManagement'
import './Widget.scss'
import {Button} from "antd";

const INIT_WORK = [
    {
        appType: 'postin',
        label: "PostIn",
        description: "接口自动化测试",
        img:apiboxImg,
        appUrl:"",
        id:"1"
    },
    {
        appType: 'teamwire',
        label: "TeamWire",
        description: "项目管理系统",
        img:projectImg,
        appUrl:"",
        id:"2"
    },
    {
        appType: 'teston',
        label: "TestOn",
        description: "Jtest系统",
        img:knowledgeImg,
        appUrl:"",
        id:"3"
    },
    {
        appType: 'kanass',
        label: "Kanass",
        description: "知识库系统",
        img:knowledgeImg,
        appUrl:"",
        id:"4"
    },
    {
        appType: 'matflow',
        label: "MatFlow",
        description: "自动化部署系统",
        img:jenkinsImg,
        appUrl:"",
        id:"5"
    },
]

const Products = () => {
    const [applications, setApplications] = useState([]);

    const [visibleManagement,setVisibleManagement] = useState(false)

    const user = getUser();
    useEffect(() => {
        getWorkList().then(r => {})
    }, [])

    const getWorkList = async () => {
        const data = await ProductWidgetsServer.getWorkList();
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

    return(
        <div className={'widget'}>
            <div className={'widget-card'}>
                <div className='widget-card-body'>
                    <div className={'card'}>
                        <div className="card-header">
                            <div className="card-header-title">切换产品空间</div>
                            <Button type={'link'} onClick={()=>setVisibleManagement(true)}>编辑配置</Button>
                        </div>
                        <div className={'card-content'}>
                            <div className={'card-content-wrap'}>
                                {
                                    applications.map(item => {
                                        const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;
                                        return(
                                            <div key={item.id}>
                                                <a className={'card-item'} href={url}>
                                                    <div className={'card-item_img'}>
                                                        <img src={item.img} width={44} height={44} alt={item.label}/>
                                                    </div>
                                                    <div className={'card-item_title'}>{item.label}</div>
                                                    <div className={'card-item_desc'}>{item.label}</div>
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppLinkManagement
                visibleManagement={visibleManagement}
                setVisibleManagement={setVisibleManagement}
                applications={applications}
                requestWorkList={getWorkList}
            />
        </div>
    )
}

export default Products
