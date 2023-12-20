/**
 * @name: domainUserPage
 * @author mahai
 * @date 2023/2/6 1:53 PM
 * @description domainUserPage
 */

import React from "react";
import {Axios, getUser} from "thoughtware-core-ui";
import {DomainUser} from 'thoughtware-user-ui'

const DomainUserPage = (props) => {


    const onCreateDemo = async () => {
        const formData = new FormData()
        formData.append("domainId", "1234")
        formData.append("userId", getUser().userId)
        await Axios.post('/dmRoleUser/demo', formData)
    }
    return(
        <div>
            {/*<Button onClick={onCreateDemo}>创建一下项目demo</Button>*/}
            <DomainUser {...props} domainId={"1234"}/>
        </div>

    )
};

export default DomainUserPage;
