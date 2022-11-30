/**
 * @name: PreliminaryListPage
 * @author mahai
 * @date 2022/11/14 3:52 PM
 * @description PreliminaryListPage
 */
import React from 'react';
import {PreliminaryList} from "tiklab-form-ui";

const PreliminaryListPage = props => {

    return(
        <>
            <PreliminaryList {...props} isBase={false}/>
        </>
    )
}
export default PreliminaryListPage
