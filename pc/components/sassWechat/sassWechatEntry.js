/**
 * @name: project
 * @author mahai
 * @date 2022/3/24 2:55 PM
 * @description project
 */


import React from 'react';
import { urlQuery} from 'doublekit-core-ui'
import useWechatConfig from "./useWechatConfig";
const SassWechatEntry = ({ history, appType}) =>  {
    const query = urlQuery(window.location.search || window.location.href);
    const step = useWechatConfig(history,appType, query)
    return (
        <div>{step}</div>
    );
}

export default SassWechatEntry;
