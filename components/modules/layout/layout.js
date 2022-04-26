/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */
import React from 'react';
import {renderRoutes} from 'react-router-config'
import Portal from "./baseLayout/Portal";

import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from "../../login";
import verifyUserHOC from "../../HOC/VaildUserHOC";

const Layout = props => {
    return (
        <Portal {...props}>
            {renderRoutes(props.route.routes)}
        </Portal>
    )
};
const MobxLayout = verifyUserHOC(Layout)
export default inject(LOGIN_STATUS)(observer(MobxLayout));
