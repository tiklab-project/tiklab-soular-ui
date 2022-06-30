
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {renderRoutes} from "react-router-config";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import {useTranslation} from 'react-i18next'
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui';
import { orgStores } from 'doublekit-user-ui';
import {initFetch, PluginProvider} from "doublekit-plugin-ui";
import stores from "../components/modules/stores";
import resources from "../components/modules/common/language/resources";
import routes from '../components/modules/routers';
import '../components/modules/common/language/i18n';

import 'antd/dist/antd.css';


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

    useEffect(() => {
        initFetch('post', routes, resources, i18n).then(res => {
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





