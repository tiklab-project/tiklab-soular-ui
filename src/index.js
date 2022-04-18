
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import routes from '../components/modules/routers';
import { Provider } from 'mobx-react';
import { privilegeStores } from 'doublekit-privilege-ui';
import { messageModuleStores } from 'doublekit-message-ui';
import { orgStores } from 'doublekit-user-ui';
import App from './App'
import '../components/modules/common/language/i18n';
import stores from "../components/modules/stores";

const Index = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
        ...privilegeStores,
        ...messageModuleStores,
        ...orgStores
    };

    allStore.pluginsStore.initLoadPlugin(method, plugin_url)
    allStore.pluginsStore.setProjectRouter(routes);

    return (
        <Provider {...allStore}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// eslint-disable-next-line no-undef
if (module.hot) {
    // eslint-disable-next-line no-undef
    module.hot.accept();
}


