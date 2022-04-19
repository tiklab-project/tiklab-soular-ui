/**
 * @name: setting
 * @author: mahai
 * @date: 2021-05-21 16:51
 * @description：setting
 * @update: 2021-05-21 16:51
 */
import React, {useState, useEffect}  from 'react';
import {renderRoutes} from 'react-router-config'
import {MenuList} from 'doublekit-privilege-ui';
import {inject, observer} from "mobx-react";
import {PLUGIN_STORE} from "doublekit-plugin-manage";
import {settingMenuData} from "../../utils/staticConfig";

const Setting = props => {
    const {pluginsStore} = props;
    const {pluginConfig, isInitLoadPlugin} = pluginsStore;

    // 显示导航菜单demo
    const [menuData, setMenuData] = useState(settingMenuData);

    useEffect(() => {
        if (isInitLoadPlugin) {
            const PluginMenus =  pluginConfig('settingMenu').map(item => {
                return item.routers.filter(item => item.menuTitle)
            }).flat(Infinity);
            const data = PluginMenus.map(item => {
                return {
                    key: '/' + item.mount  + item.router,
                    id: '/' + item.mount  + item.router,
                    title: item.menuTitle
                }
            })
            setMenuData(settingMenuData.concat(data))
        }
    }, [isInitLoadPlugin]);

    const onSelectMenu = e => {
        const key = e.key;
        const PluginMenus = pluginConfig('settingMenu').map(item => {
            return item.routers.filter(item => item.menuTitle)
        }).flat(Infinity).map(item => {
            return {
                key: '/' + item.mount  + item.router,
                router:'/' + item.mount  + item.router
            }
        })


        let links = [
            {
                key:'1',
                router: '/setting/plugin'
            },
        ].concat(PluginMenus);
        onSelectMenuSetting(props.history, key, links)
    }

    const onSelectMenuSetting = (history, key, links) => {
        const index = links.findIndex(item => item.key === key)
        history.push(links[index].router)
    }
    return (
        <div style={{    display: 'flex',height: '100%'}}>
            <MenuList
                data={menuData}
                onSelectMenu={onSelectMenu}
                defaultSelectedKeys={['1']}
            />
            <div style={{width:'100%'}}>
                {renderRoutes(props.route.routes)}
            </div>
        </div>
    )
};
export default inject(PLUGIN_STORE)(observer(Setting))
