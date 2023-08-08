import React from 'react';
import {Link} from "react-router-dom";
import {LeftOutlined} from '@ant-design/icons';
import { Breadcrumb, Space } from 'antd';
import './style/index.scss';

/**
 * 面包屑
 * @param {*} props 
 * @returns 
 */
const BreadCrumb = props => {

    const {routes, children} = props;

    const itemRender = (route, params, routes) => {
        const last = routes.indexOf(route) === routes.length -1;
        const isFirst = routes.indexOf(route) === 0;
        if (route.disabled) return  <span>{route.breadcrumbName}</span>
        return isFirst ? (
            route.click ?
                <Space>
                    <LeftOutlined
                        onClick={()=> route.click()}
                        style={{
                            fontSize:"var(--tiklab-font-16)"
                        }}
                    />
                    {route.breadcrumbName}
                </Space>
                : <Link to={route.path}>
                    <Space>
                        <LeftOutlined
                            style={{
                                fontSize:"var(--tiklab-font-16)"
                            }}
                        />
                        {route.breadcrumbName}
                    </Space>
                </Link>
        ):
            last ? <span>{route.breadcrumbName}</span>:(
                route.click ?
                    <a onClick={()=> route.click()} style={{ cursor: 'pointer'}}>
                        {route.breadcrumbName}
                    </a>
                    : route.path ? <Link to={route.path}>{route.breadcrumbName}</Link> : <>{route.breadcrumbName}</>
            )
    }

    return(
        <div className={'privilege-breadcrumb'}>
            <Breadcrumb itemRender={itemRender} routes={routes} />
            {children}
        </div>
    )
}


export default BreadCrumb
