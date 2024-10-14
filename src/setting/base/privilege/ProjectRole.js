import React from "react";
import {ProjectRole} from "tiklab-privilege-ui";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectRoleContent = props =>{

    return <ProjectRole {...props} bgroup={"soular"} isBase={true}/>

}

export default ProjectRoleContent
