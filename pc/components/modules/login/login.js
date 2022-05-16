/**
 * @name: login
 * @author: mahai
 * @date: 2021-05-24 10:52
 * @description：login
 * @update: 2021-05-24 10:52
 */
import React from 'react';
import {Login} from "doublekit-eam-ui";


const PortalLogin  = props => {
    return (
        <Login
            {...props}
            title={'portal'}
        />
    )
}

export default PortalLogin
