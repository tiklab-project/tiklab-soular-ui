import React from "react";
import {ProductAuth} from "tiklab-licence-ui";

/**
 * (授权)应用访问权限
 * @param props
 * @returns {Element}
 * @constructor
 */
const ProductAuthContent = (props) => {
    return (
        <ProductAuth {...props} bgroup={'soular'}/>
    )
}

export default ProductAuthContent
