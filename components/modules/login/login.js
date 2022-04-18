/**
 * @name: login
 * @author: mahai
 * @date: 2021-05-24 10:52
 * @description：login
 * @update: 2021-05-24 10:52
 */
import React from 'react';
import {PortalLogin} from "../../login";


const Login  = props => {
    return (
        <div>
            <PortalLogin
                {...props}
                loginGo={'/work'}
            />
        </div>
    )
}

export default Login
