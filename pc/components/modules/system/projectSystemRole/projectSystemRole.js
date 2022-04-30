/**
 * @name: projectSystemRole
 * @author: mahai
 * @date: 2021-05-06 15:17
 * @description：项目系统角色
 * @update: 2021-05-06 15:17
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import {ProjectRoleList, SYSTEM_ROLE_STORE} from "doublekit-privilege-ui";
import {onSelectMenuSwitch} from "../../../utils/staticConfig";



const ProjectSystemRole = props => {

    const onSelectMenu = e => {
        const key = e.key;
        onSelectMenuSwitch(props.history, key)
    }
    return(
        <ProjectRoleList
            {...props}
            group={'project'}
        />
    )
}
export default inject( SYSTEM_ROLE_STORE)(observer(ProjectSystemRole))
