/**
 * @name: index
 * @author mahai
 * @date 2022/10/24 10:58 AM
 * @description index
 */

import React from "react";
import {getUser} from 'thoughtware-core-ui';
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import './Profile.scss';

const Profile = ({userInfo = undefined,...props}) => {

    const user = !!userInfo ? userInfo : getUser();

    const renderEl = () => {
        if (user.avatar && user.avatar !== "null") {
            return <Avatar src={user.avatar} {...props}/>
        }

        if (user.nickname && user.nickname !== "null") {
            return <Avatar {...props}>{user.nickname.substring(0, 1)}</Avatar>
        }

        if (user.name && user.name !== "null") {
            return <Avatar {...props}>{user.name.substring(0, 1)}</Avatar>
        }

        return <Avatar size={32} icon={<UserOutlined />} {...props}/>
    }

    return (
        <div className='thoughtware-profile'>
            {renderEl()}
        </div>
    )
}
export default Profile;
