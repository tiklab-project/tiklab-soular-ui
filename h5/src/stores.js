import { LoginStore, LOGIN_STATUS } from '../components';
function createStores() {
    return {
        [LOGIN_STATUS]: new LoginStore(),
    };
}

const stores = createStores();



export {
    stores,
};

