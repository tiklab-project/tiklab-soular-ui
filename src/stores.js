import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store';

function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
    };
}

const stores = createStores();

export default stores;

