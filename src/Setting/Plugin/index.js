/**
 * @name: index
 * @author: mahai
 * @date: 2021-12-27 15:21
 * @description：index
 * @update: 2021-12-27 15:21
 */
import React from "react";
import {Plugin} from 'tiklab-plugin-manager-ui'


const PluginMange = (props) => {

    return(
        <Plugin {...props} detailRouter={'/system/detail'}/>
    )
}

export default PluginMange
