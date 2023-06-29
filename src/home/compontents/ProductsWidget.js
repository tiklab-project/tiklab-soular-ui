import React, {useState, useEffect} from "react";
import {getUser, parseUserSearchParams} from "tiklab-core-ui";
import {getWorkListService} from "../store/store";
import {message} from "antd";
import ProductsAppLink from './ProductsAppLink';
import Btn from '../../common/btn'

import {WORK_IMAGE} from "../../utils/constant";

import './ProductsWidget.scss'


const INIT_WORK = [
    {
        appType: 'postin',
        label: "PostIn",
        description: "接口自动化测试",
        appUrl:"",
        id:"1"
    },
    {
        appType: 'teamwire',
        label: "TeamWire",
        description: "项目管理系统",
        appUrl:"",
        id:"2"
    },
    {
        appType: 'teston',
        label: "TestOn",
        description: "Jtest系统",
        appUrl:"",
        id:"3"
    },
    {
        appType: 'kanass',
        label: "Kanass",
        description: "知识库系统",
        appUrl:"",
        id:"4"
    },
    {
        appType: 'matflow',
        label: "MatFlow",
        description: "自动化部署系统",
        appUrl:"",
        id:"5"
    },
    {
        appType: 'xcode',
        label: "XCode",
        description: "代码管理",
        appUrl:"",
        id:"6"
    },
    {
        appType: 'xpack',
        label: "XPack",
        description: "制品库管理",
        appUrl:"",
        id:"7"
    },
]

/**
 * 产品空间
 * @returns {JSX.Element}
 * @constructor
 */
const ProductsWidget = () => {

    const [applications, setApplications] = useState([]);

    const [visibleManagement,setVisibleManagement] = useState(false)

    const user = getUser();
    useEffect(() => {
        // 初始化地址
        getWorkList().then(r => {})
    }, [])

    /**
     * 获取产品配置的地址
     * @returns {Promise<void>}
     */
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

    /**
     * 跳转
     * @param item
     */
    const goApplication = item => {
        if(!item.appUrl) return message.info("该产品未配置应用链接",0.5)
        const url = user.ticket ? `${item.appUrl}?${parseUserSearchParams({
            ticket:user.ticket
        })}` : item.appUrl;
        window.open(url)
    }

    return(
        <div className={'widget'}>
            <div className={'widget-card'}>
                <div className='widget-card-body'>
                    <div className={'card'}>
                        <div className="card-header">
                            <div className="card-header-title">产品空间</div>
                            <Btn type={'link'} onClick={()=>setVisibleManagement(true)}>配置</Btn>
                        </div>
                        <div className={'card-content'}>
                            <div className={'card-content-wrap'}>
                                {
                                    applications.map(item => {
                                        return(
                                            <div key={item.id} className={'card-item'} onClick={()=>goApplication(item)}>
                                                <div className={'card-item_img'}>
                                                    <img src={WORK_IMAGE[item.appType]} width={44} height={44} alt={item.label}/>
                                                </div>
                                                <div className={'card-item_title'}>{item.label}</div>
                                                <div className={'card-item_desc'}>{item.label}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductsAppLink
                visibleManagement={visibleManagement}
                setVisibleManagement={setVisibleManagement}
                applications={applications}
                requestWorkList={getWorkList}
            />
        </div>
    )
}

export default ProductsWidget
