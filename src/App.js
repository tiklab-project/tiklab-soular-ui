import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import {PLUGIN_STORE} from "doublekit-plugin-ui";
import {renderRoutes} from "react-router-config";
import useVersion from "../components/hooks/useVersion";

const App = (props) => {
    const {pluginsStore} = props;
    const {routers, isInitLoadPlugin} = pluginsStore;
    const [loading, setLoading] = useState(false);

    useVersion();
    useEffect(() => {
        if (isInitLoadPlugin) {
            setLoading(true)
        }
    }, [isInitLoadPlugin]);

    useEffect(() => {
        console.log(12212)
    }, [])
    return(
        <>
            {
                loading ? renderRoutes(routers) : <div>加载中....</div>
            }
        </>
    )

};

export default inject(PLUGIN_STORE)(observer(App))

