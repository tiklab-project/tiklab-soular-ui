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
import TodoWidget from '../widgets/todoWidget'

import OpLogWidget from '../widgets/opLogWidget'

const Widgets = {
    'eas_application':Product,
    'eas_todo': TodoWidget,
    'eas_oplog': OpLogWidget,
    'eas_message': MessageWidget,
}

export {Widgets}
