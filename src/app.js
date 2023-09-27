import React, {useEffect, useState} from 'react';
import {renderRoutes} from "react-router-config";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import {useTranslation} from 'react-i18next';
import {useAccountConfig} from 'tiklab-eam-ui/es/utils';
import {PluginProvider, pluginLoader} from "tiklab-plugin-core-ui";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import resources from "./common/language/resources";
import './common/language/i18n';
import './styles/index.scss';

const App = (props) => {

    const {allStore,routes} = props

    const {i18n} = useTranslation();
    const [visible,setVisible] = useState(true);
    const [pluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    });

    useAccountConfig()

    useEffect(() => {
        pluginLoader(routes, resources, i18n).then(res => {
            setPluginData(res)
            setVisible(false)
        })
    }, []);

    if (visible) {
        return <div>加载中</div>
    }

    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        {
                            renderRoutes(pluginData.routes)
                        }
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </PluginProvider>
    );
};

export default App





