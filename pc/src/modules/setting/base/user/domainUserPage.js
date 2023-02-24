/**
 * @name: domainUserPage
 * @author mahai
 * @date 2023/2/6 1:53 PM
 * @description domainUserPage
 */

import React, {useEffect} from "react";
import {Axios, getUser} from "tiklab-core-ui";
import {DomainUserList} from 'tiklab-user-ui'
import {Button} from "antd";

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
            <DomainUserList {...props} domainId={"1234"}/>
        </div>

    )
};

export default DomainUserPage;
