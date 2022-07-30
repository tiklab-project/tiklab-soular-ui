/**
 * @name: electornLogin
 * @author mahai
 * @date 2022/5/13 8:09 PM
 * @description electornLogin
 */
import React from 'react';
import {ElectronLogin} from "tiklab-eam-ui";


const ElectronLoginPage  = props => {


    return (
        <div>
            <ElectronLogin
                {...props}
                loginGoRouter={'/auth_result'}
            />
        </div>

    )
}

export default ElectronLoginPage
