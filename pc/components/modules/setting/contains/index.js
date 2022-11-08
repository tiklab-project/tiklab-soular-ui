import React, {useState, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {renderRoutes} from 'react-router-config';
import {MenuList} from 'tiklab-privilege-ui';
import {SYSTEM_ROLE_STORE} from 'tiklab-privilege-ui/es/store';

import {onSettingMenu, settingMenuData} from "../../../utils/staticConfig";


const links = [
    {
        key:'1-1',
        router:`/setting/orga`,
    },
    {
        key:'1-2',
        router:`/setting/user`,
    },
    {
        key:'1-3',
        router:`/setting/dir`,
    },
    {
        key:'2',
        router:`/setting/permission`,
    },
    {
        key:'3-1',
        router:`/setting/messagesendtype`,
    },
    {
        key:'3-2',
        router:`/setting/message`,
    },
    {
        key:'4',
        router:`/setting/todotask`,
    },
    {
        key:'5',
        router:`/setting/plugin`,
    },
    {
        key:'6-1',
        router:`/setting/log`,
    },
    {
        key:'7',
        router:`/setting/version`,
    },
    {
        key:'8-1',
        router:`/setting/base/todotemplate`,
    },
    {
        key:'8-2',
        router:`/setting/base/oplogtemplate`,
    },
    {
        key:'8-3',
        router:`/setting/base/systemfeature`,
    },
    {
        key:'8-4',
        router:`/setting/base/systemrole`,
    },
    {
        key:'8-7',
        router: "/setting/base/messagetemplate"
    },
    {
        key:'8-8',
        router: "/setting/base/messagesendtype"
    },
    {
        key:'8-9',
        router: "/setting/base/messagetype"
    },
];

const SettingLayout = ({history, route, systemRoleStore}) => {
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
        onSettingMenu(history, key)
    }
    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={settingMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={menuKeys.selectedKeys}
                defaultOpenKeys={menuKeys.openKeys}
                selectedKeys={menuKeys.selectedKeys}
                openKeys={menuKeys.openKeys}
                allPromise={systemRoleStore.systemPermissions}
            />
            <div style={{width:'100%', overflow:'auto'}}>
                {renderRoutes(route.routes)}
            </div>

        </div>
    )
}
export default inject(SYSTEM_ROLE_STORE)(observer(SettingLayout));
