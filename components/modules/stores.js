import { LoginStore, LOGIN_STATUS } from '../index';
import {PLUGIN_STORE, PluginStore} from "doublekit-plugin-ui"
function createStores() {
    return {
        [LOGIN_STATUS]: new LoginStore(),
        [PLUGIN_STORE]: new PluginStore(),
    };
}

const stores = createStores();

export default stores;

