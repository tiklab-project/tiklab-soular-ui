import React from "react";
import {ProjectMessageNotice} from "tiklab-message-ui";

/**
 * 项目消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ProjectMessageNoticeContent = props =>{

    return <ProjectMessageNotice {...props} bgroup={"soular"} isBase={true}/>

}

export default ProjectMessageNoticeContent
