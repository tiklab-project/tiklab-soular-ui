/**
 * @name: projectSystemRole
 * @author: mahai
 * @date: 2021-05-06 15:17
 * @description：项目系统角色
 * @update: 2021-05-06 15:17
 */
import React from 'react';
import {ProjectRole } from "tiklab-privilege-ui";



const ProjectSystemRole = props => {

    return(
        <ProjectRole
            {...props}
            group={'project'}
        />
    )
}
export default ProjectSystemRole
