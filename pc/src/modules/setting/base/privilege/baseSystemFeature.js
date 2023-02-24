

/**
 * @name: baseSystemFeature
 * @author mahai
 * @date 2022/10/28 1:07 PM
 * @description baseSystemFeature
 */

import React from 'react';
import {SystemFeatureList} from "tiklab-privilege-ui";


const BaseSystemFeature = (props) => {
    return(
        <SystemFeatureList
            {...props}
        />
    )
}

export default BaseSystemFeature
