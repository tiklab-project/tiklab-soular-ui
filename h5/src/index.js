
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import routes from './routers';
import { Provider } from 'mobx-react';
import { stores } from './stores';

import './common/language/i18n';

const Index = () => {
    // 注册所有插件
    let allStore = {
        ...stores,
    };

    return (
        <Provider {...allStore}>
            <HashRouter>
                {
                    renderRoutes(routes)
                }
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


