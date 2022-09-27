/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {useState, useEffect}  from 'react';
import {getUser} from 'tiklab-core-ui';
import {Link} from 'react-router-dom';


import {List} from "antd-mobile";
import {AddOutline, EditSOutline} from "antd-mobile-icons";
import WorkService from "../../service/workService";

import {WORK_NAME} from '../../constant';
import "./list.scss";




const ProjectList = (props) => {
    const [urls, setUrls] = useState([]);

    const user = getUser();
    useEffect(() => {
        WorkService.getWorkList().then(res =>{
            setUrls(res)
        })
    }, [])

    const ListHeader = (
        <div className='workList'>
            <span>产品列表</span>
            <Link to={'/project/add'}><AddOutline/></Link>

        </div>
    );


    const openProjectLink = (url) => {
        const uri = user.ticket ? `${url}?loginType=${user.loginType}&email=${user.email}&name=${user.name}&expireTime=${user.expireTime}&ticket=${user.ticket}&phone=${user.phone}&userId=${user.userId}`: url
        window.open(uri, '_self')
    }

    return (
        <List header={ListHeader} mode={'card'}>
            {
                urls.map(res => {
                    return <List.Item
                        key={res.id}
                        extra={
                            <Link to={`/project/${res.id}/edit`}>
                                <EditSOutline/>
                            </Link>
                        }
                    >
                        <div onClick={() => openProjectLink(res.appUrl)}>
                            {WORK_NAME[res.appType].label}
                        </div>

                    </List.Item>
                })
            }

        </List>
    )
}
export default ProjectList
