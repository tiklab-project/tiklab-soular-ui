/**
 * @name: index
 * @author: mahai
 * @date: 2021-09-30 10:31
 * @description：index
 * @update: 2021-09-30 10:31
 */

import React, { Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {useVersion} from 'doublekit-portal-ui'
import { renderRoutes } from 'react-router-config';
import { Provider } from 'mobx-react';
import stores from './stores';
import routes from './router';
import './language/i18n';

import './styles/reset.scss';
import LoginPage from "./pages/login";

function App() {
    useVersion()
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className='loading-wrapper'>
                        加载中。。。
                    </div>
                }
            >
                <Provider {...stores}>
                   <LoginPage/>
                </Provider>
            </Suspense>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))