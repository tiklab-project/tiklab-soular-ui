/**
 * @name: index
 * @author: mahai
 * @date: 2021-12-27 15:21
 * @description：index
 * @update: 2021-12-27 15:21
 */
import React from "react";
import {PluginList} from 'doublekit-plugin-ui'


const PluginMange = (props) => {

    return(
        <PluginList {...props} detailRouter={'/plugin/detail'}/>
    )
}

export default PluginMange
