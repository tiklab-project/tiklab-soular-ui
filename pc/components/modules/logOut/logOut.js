/**
 * @name: logOut
 * @author: mahai
 * @date: 2021-07-05 14:32
 * @description：logOut
 * @update: 2021-07-05 14:32
 */
import React from 'react';
import {BaseLogOut} from "../../logout";


const LogOut = props => {
    const {location} = props
    const {search} = location;
    const authConfig = {
        authType: 'local',
        search:search
    }
    return <BaseLogOut {...props} authConfig={authConfig}/>
}

export default LogOut
