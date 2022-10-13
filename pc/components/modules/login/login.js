/**
 * @name: login
 * @author: mahai
 * @date: 2021-05-24 10:52
 * @description：login
 * @update: 2021-05-24 10:52
 */
import React from 'react';
import {Login} from "tiklab-eam-ui";
import logo from '../assets/logo.png'
const PortalLogin  = props => {

    return (
        <Login
            {...props}
            title={'portal'}
            logoIcon={logo}
        />

    )
}

export default PortalLogin
