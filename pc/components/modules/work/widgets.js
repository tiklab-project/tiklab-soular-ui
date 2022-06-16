/**
 * @name: widgets
 * @author mahai
 * @date 2022/6/14 7:20 PM
 * @description widgets
 */
import React from "react";
import Product from '../widgets/products/index'
import MessageWidget from "../widgets/messageWidget/messageWidget";
const widgets = {
    'portal-productWorkspace':<Product/>,
    'portal-message': <MessageWidget/>
}



export {widgets}
