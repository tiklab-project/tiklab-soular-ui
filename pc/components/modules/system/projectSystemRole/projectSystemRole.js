/**
 * @name: projectSystemRole
 * @author: mahai
 * @date: 2021-05-06 15:17
 * @description：项目系统角色
 * @update: 2021-05-06 15:17
 */
import React from 'react';
import {ProjectRoleList, } from "doublekit-privilege-ui";



const ProjectSystemRole = props => {

    return(
        <ProjectRoleList
            {...props}
            group={'project'}
        />
    )
}
export default ProjectSystemRole
