/**
 * @name: index
 * @author mahai
 * @date 2022/6/14 1:56 PM
 * @description 产品空间
 */
import React, {useState, useEffect} from "react";
import {Button} from "antd";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {getWorkListService} from "./api";
import AppLinkManagement from './component/AppLinkManagement';

import teamwireImg from 'tiklab-eam-ui/es/assests/img/teamwire.png';
import postinImg from 'tiklab-eam-ui/es/assests/img/postin.png';
import matflowImg from 'tiklab-eam-ui/es/assests/img/matflow.png';
import kanassImg from 'tiklab-eam-ui/es/assests/img/kanass.png';
import testonImg from 'tiklab-eam-ui/es/assests/img/teston.png';

import './style/index.scss'


const INIT_WORK = [
    {
        appType: 'postin',
        label: "PostIn",
        description: "接口自动化测试",
        img:postinImg,
        appUrl:"",
        id:"1"
    },
    {
        appType: 'teamwire',
        label: "TeamWire",
        description: "项目管理系统",
        img:teamwireImg,
        appUrl:"",
        id:"2"
    },
    {
        appType: 'teston',
        label: "TestOn",
        description: "Jtest系统",
        img:testonImg,
        appUrl:"",
        id:"3"
    },
    {
        appType: 'kanass',
        label: "Kanass",
        description: "知识库系统",
        img:kanassImg,
        appUrl:"",
        id:"4"
    },
    {
        appType: 'matflow',
        label: "MatFlow",
        description: "自动化部署系统",
        img:matflowImg,
        appUrl:"",
        id:"5"
    },
    {
        appType: 'xcode',
        label: "XCode",
        description: "代码管理",
        img:matflowImg,
        appUrl:"",
        id:"6"
    },
    {
        appType: 'xpack',
        label: "XPack",
        description: "制品库管理",
        img:matflowImg,
        appUrl:"",
        id:"7"
    },
]

const ProductsWidget = () => {
    const [applications, setApplications] = useState([]);

    const [visibleManagement,setVisibleManagement] = useState(false)

    const user = getUser();
    useEffect(() => {
        getWorkList().then(r => {})
    }, [])

    const getWorkList = async () => {
        const data = await getWorkListService();
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
                            <div className="card-header-title">产品空间</div>
                            <Button type={'link'} onClick={()=>setVisibleManagement(true)}>配置</Button>
                        </div>
                        <div className={'card-content'}>
                            <div className={'card-content-wrap'}>
                                {
                                    applications.map(item => {
                                        const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams(user)}` : item.appUrl;
                                        return(
                                            <div key={item.id}>
                                                <a className={'card-item'} href={url} target="_blank">
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

export default ProductsWidget
