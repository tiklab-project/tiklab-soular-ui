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


const Layout = props => {

    return (
        <Portal {...props}>
            {renderRoutes(props.route.routes)}
        </Portal>
    )
};
export default Layout
