import {EAM_STORE, EamStore} from 'tiklab-eam-ui/es/store';
import {DATAIMPORT_STORE,DataImportStore} from "./setting/Secuity/dataImport/store/DataImportStore";

function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
        [DATAIMPORT_STORE]: new DataImportStore(),
    };
}

const stores = createStores();

export default stores;

