
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {renderRoutes} from "react-router-config";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import {useTranslation} from 'react-i18next';
import {enableAxiosCE} from 'tiklab-core-ui';
import { useAccountConfig } from 'tiklab-eam-ui/es/utils';
import { messageModuleStores } from 'tiklab-message-ui/es/store';
import { orgStores, privilegeStores } from 'tiklab-user-ui/es/store';
import {PluginProvider, initPlugin} from "tiklab-plugin-core-ui";
import stores from "./stores";
import resources from "./common/language/resources";
import routes from './routers';
import './common/language/i18n';
import './styles/index.scss';

enableAxiosCE();
const Index = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores,
        ...messageModuleStores,
        ...orgStores
    };

    const {i18n} = useTranslation();
    const [viable,setViable] = useState(true);

    const [pluginData,setPluginData] = useState({
        routes,
        pluginStore:[],
        languageStore:[]
    });

    useAccountConfig()

    useEffect(() => {
        initPlugin('post', routes, resources, i18n).then(res => {
            setPluginData(res)
            setViable(false)
        })

    }, []);

    if (viable) {
        return <div>加载中</div>
    }
    return (
        <PluginProvider store={pluginData}>
            <Provider {...allStore}>
                <HashRouter>
                    {
                        renderRoutes(pluginData.routes)
                    }
                </HashRouter>
            </Provider>
        </PluginProvider>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept();
}





