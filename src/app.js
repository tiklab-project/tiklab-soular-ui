import React from 'react';
import {renderRoutes} from "react-router-config";
import {HashRouter} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {useAccountConfig} from 'thoughtware-eam-ui/es/utils';
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import './common/language/i18n';
import './styles/index.scss';

const App = (props) => {

    const {allStore,routes} = props

    useAccountConfig()

    return (
        <Provider {...allStore}>
            <ConfigProvider locale={zhCN}>
                <HashRouter>
                    {renderRoutes(routes)}
                </HashRouter>
            </ConfigProvider>
        </Provider>
    );
};

export default App





