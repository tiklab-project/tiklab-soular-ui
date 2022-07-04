import {EAM_STORE, EamStore} from 'doublekit-eam-ui'
import {PLUGIN_STORE, PluginStore} from "doublekit-plugin-ui"
function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        [PLUGIN_STORE]: new PluginStore()
    };
}

const stores = createStores();

export default stores;

