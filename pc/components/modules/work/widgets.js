/**
 * @name: widgets
 * @author mahai
 * @date 2022/6/14 7:20 PM
 * @description widgets
 */
import React from "react";
// import {WorkspaceWidget} from 'tiklab-apibox-ui'
import Product from '../widgets/products/index'
import {MessageWidget} from 'tiklab-widget-ui'



const Widgets = {
    'eas_application':Product,
    'eas_message': MessageWidget,
}

export {Widgets}
