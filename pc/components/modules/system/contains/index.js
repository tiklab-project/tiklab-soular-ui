import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {renderRoutes} from 'react-router-config';
import {MenuList} from 'tiklab-privilege-ui';
import {SYSTEM_ROLE_STORE} from 'tiklab-privilege-ui/es/store';

import {onSystemMenu, systemMenuData} from "../../../utils/staticConfig";


const links = [

    {
        key:'1-1',
        router:`/system/feature`,
    },
    {
        key:'1-2',
        router:`/system/role`,
    },
    {
        key:'2',
        router:`/setting/subscribe`,
    },
    {
        key:'3-1',
        router:`/system/message`,
    },
    {
        key:'3-2',
        router:`/system/messagetype`,
    },
    {
        key:'3-3',
        router:`/system/messagesendtype`,
    },
    {
        key:'3-4',
        router:`/system/messagetemplate`,
    },
    {
        key:'4',
        router:`/system/plugin`,
    },
    {
        key:'5-1',
        router:`/system/todotask`,
    },
    {
        key:'5-2',
        router:`/system/mytodotask`,
    },
    {
        key:'5-3',
        router:`/system/todotemp`,
    },
    {
        key:'6',
        router:`/system/widgetMangent`,
    },
    {
        key:'8-1',
        router: "/system/logs"
    },
    {
        key:'8-2',
        router: "/system/mylog"
    },
    {
        key:'8-3',
        router: "/system/logtemplate"
    },
];

const System = ({history, route, systemRoleStore}) => {
    const [menuKeys,setMenuKeys] = useState({selectedKeys:['1-1'], openKeys:['1']});

    useEffect(() => {
        const {location} = history;
        const pathname = location.pathname;
        const index = links.findIndex(item => pathname=== item.router);
        const selected = links[index].key;

        const openKey = selected.slice("-")[0];

        setMenuKeys({
            selectedKeys:[selected],
            openKeys:[openKey]
        })
    },[])

    const onSelectMenu = e => {
        const key = e.key;
        onSystemMenu(history, key)
    }

    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={systemMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={menuKeys.selectedKeys}
                defaultOpenKeys={menuKeys.openKeys}
                selectedKeys={menuKeys.selectedKeys}
                openKeys={menuKeys.openKeys}

                allPromise={systemRoleStore.systemPermissions}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(route.routes)}
            </div>

        </div>
    )
}
export default inject(SYSTEM_ROLE_STORE)(observer(System));
