import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store';
import {formStores} from 'tiklab-form-ui/es/store';
import {flowStores} from 'tiklab-flow-ui/es/store';
function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        ...formStores,
        ...flowStores
    };
}

const stores = createStores();

export default stores;

