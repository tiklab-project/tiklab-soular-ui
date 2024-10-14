/**
 * @name: Login
 * @author: mahai
 * @date: 2021-05-24 10:52
 * @description：Login
 * @update: 2021-05-24 10:52
 */
import React from 'react';
import {Login} from "tiklab-eam-ui";

const PortalLogin  = props => {

    return (
        <Login
            {...props}
            bgroup={'soular'}
            vaildUserAuthRouter={'/noAuth'}
        />
    )
}

export default PortalLogin
