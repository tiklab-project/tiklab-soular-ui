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
    return <BaseLogOut {...props}/>
}

export default LogOut
