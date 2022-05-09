/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-11 16:08
 * @description：index
 * @update: 2021-10-11 16:08
 */
import React from 'react';
import {observer, inject} from "mobx-react";
import {} from "doublekit-user-ui";


const DarthOrg = (props) => {
    return( <OrgContent{...props}/> )
}



export default inject('orgStore')(observer(DarthOrg))
