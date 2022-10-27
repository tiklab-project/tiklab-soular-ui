/**
 * @name: feature
 * @author: mahai
 * @date: 2021-05-06 15:15
 * @description：系统级别 功能模块
 * @update: 2021-05-06 15:15
 */
import React from 'react';
import {SystemFeatureList, ProjectFeatureList} from "tiklab-privilege-ui";
// import SystemFeatureList from '../../system-feature-list/index'

const Feature = props => {
    return(
        <div>
            <SystemFeatureList {...props}/>
        </div>
    )
}

export default Feature
