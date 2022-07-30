/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */
import React, {useEffect} from 'react';
import {renderRoutes} from 'react-router-config'
import Portal from "./baseLayout/Portal";
import {getUser} from "tiklab-core-ui";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";
import {inject, observer} from "mobx-react";


const Layout = ({systemRoleStore,route, ...res}) => {

    const user = getUser();
    useEffect(() => {
        if (user.userId) {
            systemRoleStore.getSystemPermissions(user.userId).then(res => {

            })
        }
    }, [user])

    return (
        <Portal {...res}>
            {renderRoutes(route.routes)}
        </Portal>
    )
};
export default inject(SYSTEM_ROLE_STORE)(observer(Layout));
