import React, {useState, useEffect}  from 'react';
import {renderRoutes} from 'react-router-config';
import {observer, inject} from "mobx-react";
import {MenuList} from 'doublekit-privilege-ui';
import {PLUGIN_STORE} from 'doublekit-plugin-manage';
import {orgaMenuData} from "../../../utils/staticConfig";


const Orga = props => {

    const {pluginsStore} = props;
    const {pluginConfig, isInitLoadPlugin} = pluginsStore;
    const onSelectMenu = e => {
        const key = e.key;
        const PluginMenus = pluginConfig('orgaMenu').map(item => {
            return item.routers.filter(item => item.menuTitle)
        }).flat(Infinity).map(item => {
            return {
                key: '/' + item.mount  + item.router,
                router:'/' + item.mount  + item.router
            }
        })


        // const PluginMenus = pluginConfig('orgaMenu').filter(item => item.extraProps).map(item => {
        //     return {
        //         key: item.id,
        //         router:'/' + item.router.mount  + item.router.router
        //     }
        // })
        let links = [{
            key:'1',
            router: '/orga/dashbord'
        },{
            key:'2',
            router: '/orga/user'
        },{
            key:'3',
            router: '/orga/peojectpeople'
        },{
            key:'4',
            router: '/orga/directory'
        }].concat(PluginMenus)

        OrgaOnSelectMenuSwitch(props.history, key, links)
    }

    const OrgaOnSelectMenuSwitch = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }

    // 显示导航菜单demo
    const [menuData, setMenuData] = useState(orgaMenuData);

    useEffect(() => {
        if (isInitLoadPlugin) {
            const PluginMenus =  pluginConfig('orgaMenu').map(item => {
                return item.routers.filter(item => item.menuTitle)
            }).flat(Infinity);
            const data = PluginMenus.map(item => {
                return {
                    key: '/' + item.mount  + item.router,
                    id: '/' + item.mount  + item.router,
                    title: item.menuTitle
                }
            })
            setMenuData(orgaMenuData.concat(data))
        }

    }, [isInitLoadPlugin]);
    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={menuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['2']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
}

export default inject(PLUGIN_STORE)(observer(Orga))
