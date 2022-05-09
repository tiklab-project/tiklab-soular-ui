/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-09 15:09
 * @description：index
 * @update: 2021-10-09 15:09
 */
import React from 'react';
import {observer, inject} from "mobx-react";
import {OrgContent} from "doublekit-user-ui";


const DarthOrg = (props) => {
    return( <OrgContent{...props}/> )
}



export default inject('orgStore')(observer(DarthOrg))
