import { LoginStore, LOGIN_STATUS } from '../components';
import {PLUGIN_STORE, PluginStore} from "doublekit-plugin-manage"
function createStores() {
    return {
        [LOGIN_STATUS]: new LoginStore(),
        [PLUGIN_STORE]: new PluginStore(),
    };
}

const stores = createStores();



export {
    stores,
};

