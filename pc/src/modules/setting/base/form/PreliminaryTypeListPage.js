/**
 * @name: PreliminaryTypeListPage
 * @author mahai
 * @date 2022/11/14 3:52 PM
 * @description PreliminaryTypeListPage
 */
import React from 'react';
import {PreliminaryType} from "tiklab-form-ui";


const PreliminaryTypeListPage = props => {

    return(
        <PreliminaryType {...props} isBase={true}/>
    )
}
export default PreliminaryTypeListPage
