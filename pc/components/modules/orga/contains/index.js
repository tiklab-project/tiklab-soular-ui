import React from 'react';
import {renderRoutes} from 'react-router-config';
import {MenuList} from 'doublekit-privilege-ui';
import {orgaMenuData} from "../../../utils/staticConfig";


const Orga = props => {

    const onSelectMenu = e => {
        const key = e.key;

        let links = [{
            key:'1',
            router: '/orga/dashbord'
        },{
            key:'2',
            router: '/orga/user'
        }, {
            key:'4',
            router: '/orga/directory'
        }]

        OrgaOnSelectMenuSwitch(props.history, key, links)
    }

    const OrgaOnSelectMenuSwitch = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }



    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={orgaMenuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['2']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}

export default Orga
