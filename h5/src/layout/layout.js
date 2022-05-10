/**
 * @name: layout
 * @author: mahai
 * @date: 2021-05-21 16:53
 * @description：layout
 * @update: 2021-05-21 16:53
 */
import React from 'react';
import {inject, observer} from 'mobx-react';
import {Redirect} from "react-router";
import {renderRoutes} from 'react-router-config'
import {urlQuery, saveUser} from "doublekit-core-ui"
import {LOGIN_STATUS} from '../../components'

const Layout = (props) => {
    const {TabBarComponent, redirect = '/login',  portalLoginStore} = props;
    const { isLogin } = portalLoginStore;

    const query = urlQuery(window.location.href);
    if (query.ticket && query.userId && query.name && query.phone && query.email) {
        saveUser(query)
        window.location.href =  window.location.origin
    }

    if (!isLogin) return <Redirect to={redirect}/>
    return (
        <>
            {renderRoutes(props.route.routes)}
            {
                TabBarComponent &&   <div>
                    {TabBarComponent}
                </div>
            }

        </>
    )
};

export default inject(LOGIN_STATUS)(observer(Layout))
