import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import {PLUGIN_STORE, loadLanguage} from "doublekit-plugin-ui";
import {useVersion} from "doublekit-eam-ui";
import {renderRoutes} from "react-router-config";
import {toJS} from "mobx";
import {I18nextProvider, useTranslation} from "react-i18next";
import resources from "../components/modules/common/language/resources";


const App = (props) => {
    const {pluginsStore} = props;
    const {routers, isInitLoadPlugin, languages} = pluginsStore;
    const [loading, setLoading] = useState(false);

    const [resourcesLangualge, setResources] = useState({});

    const { i18n, t } = useTranslation();
    useVersion();

    useEffect(() => {
        if (isInitLoadPlugin) {
            setLoading(true)
            loadLanguage(i18n, resources, languages, 'post', 'zh').then(res => {

                if (res) {
                    const resourcesList = {
                        // en:res.en,
                        zh:res.zh
                    }
                    setResources(resourcesList)
                } else {
                    setResources(resources)
                }
            })
        }
    }, [isInitLoadPlugin]);
    console.log(toJS(languages))
    const newI18 = i18n.cloneInstance({ resources: resourcesLangualge });

    return(
        <I18nextProvider i18n={newI18}>
            {
                loading ? renderRoutes(routers) : <div>加载中....</div>
            }
        </I18nextProvider>
    )

};

export default inject(PLUGIN_STORE)(observer(App))

