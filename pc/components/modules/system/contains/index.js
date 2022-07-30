import React from 'react';
import {inject, observer} from 'mobx-react';
import {renderRoutes} from 'react-router-config';
import {MenuList} from 'tiklab-privilege-ui';
import {SYSTEM_ROLE_STORE} from 'tiklab-privilege-ui/es/store';

import {onSystemMenu, systemMenuData} from "../../../utils/staticConfig";


const System = ({history, route, systemRoleStore}) => {

    const onSelectMenu = e => {
        const key = e.key;
        onSystemMenu(history, key)
    }

    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={systemMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['1-1']}
                defaultOpenKeys={['1']}
                allPromise={systemRoleStore.systemPermissions}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(route.routes)}
            </div>

        </div>
    )
}
export default inject(SYSTEM_ROLE_STORE)(observer(System));
