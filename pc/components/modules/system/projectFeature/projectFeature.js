/**
 * @name: projectFeature
 * @author: mahai
 * @date: 2021-05-06 15:15
 * @description：权限功能你中的项目功能模块
 * @update: 2021-05-06 15:15
 */

import React from 'react';
import {inject, observer} from "mobx-react";
import {ProjectFeatureList, SYSTEM_ROLE_STORE, PRIVILEGE_PROJECT_FEATURE_STORE} from "doublekit-privilege-ui";


const ProjectFeature = props => {
    return(
        <ProjectFeatureList
            {...props}
        />
    )
}

export default inject(PRIVILEGE_PROJECT_FEATURE_STORE, SYSTEM_ROLE_STORE)(observer(ProjectFeature))
