import React from 'react';
import {renderRoutes} from 'react-router-config';
import {MenuList} from 'doublekit-privilege-ui';
import {onSystemMenu, systemMenuData} from "../../../utils/staticConfig";


const System = props => {

    const onSelectMenu = e => {
        const key = e.key;
        onSystemMenu(props.history, key)
    }

    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={systemMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['1-1']}
                defaultOpenKeys={['1']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>

        </div>
    )
}
export default System;
