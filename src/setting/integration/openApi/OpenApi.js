/**
 * @Description: 集成openApi
 * @Author: gaomengyuan
 * @Date: 2025/3/20
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/20
 */
import React from "react";
import {AccessToken} from 'tiklab-openapi-ui';

const OpenApi = (props) => {

    return (
        <AccessToken
            {...props}
            postInOpenApiPath={'/openApiDoc'}
        />
    )

}

export default OpenApi
