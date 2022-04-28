/**
 * @name: feature
 * @author: mahai
 * @date: 2021-05-06 15:15
 * @description：系统级别 功能模块
 * @update: 2021-05-06 15:15
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import {FeatureList, SYSTEM_ROLE_STORE, PRIVILEGE_SYSTEM_STORE} from "doublekit-privilege-ui";


const Feature = props => {
    return(
        <div>
            <FeatureList {...props}/>
        </div>
    )
}

export default inject(PRIVILEGE_SYSTEM_STORE, SYSTEM_ROLE_STORE)(observer(Feature))
