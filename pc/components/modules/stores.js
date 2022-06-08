import {EAM_STORE, EamStore} from 'doublekit-eam-ui'
import {PLUGIN_STORE, PluginStore} from "doublekit-plugin-ui"
import {formStores, } from 'doublekit-form-ui'
import {flowStores} from "doublekit-flow-ui";
function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        [PLUGIN_STORE]: new PluginStore(),
        ...flowStores,
        ...formStores,
    };
}

const stores = createStores();

export default stores;

