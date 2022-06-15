/**
 * @name: index
 * @author mahai
 * @date 2022/6/14 1:56 PM
 * @description 产品空间
 */
import React, {useState, useEffect} from "react";
import {getUser, parseUserSearchParams} from "doublekit-core-ui";
import ProductWidgetsServer from "../products/api";
import {apiboxImg, jenkinsImg, knowledgeImg, projectImg} from "doublekit-eam-ui";
import './Widget.scss'

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

const Products = () => {
    const [applications, setApplications] = useState([]);

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
                                                        <img src={item.img} width={44} height={44}/>
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
        </div>
    )
}

export default Products
