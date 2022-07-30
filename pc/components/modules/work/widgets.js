/**
 * @name: widgets
 * @author mahai
 * @date 2022/6/14 7:20 PM
 * @description widgets
 */
import React from "react";
// import {WorkspaceWidget} from 'tiklab-apibox-ui'
import Product from '../widgets/products/index'
import MessageWidget from "../widgets/messageWidget/messageWidget";


const widgets = (url, apiUrl) => {
    const widgets = {
        'portal_application':<Product webUrl={url} apiUrl={apiUrl}/>,
        'portal_message': <MessageWidget webUrl={url} apiUrl={apiUrl}/>,
        // "apibox-workspace": <WorkspaceWidget webUrl={url} apiUrl={apiUrl}/>
    }
    return widgets
}

export {widgets}
