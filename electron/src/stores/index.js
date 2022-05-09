/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-09 10:14
 * @description：index
 * @update: 2021-10-09 10:14
 */

import { LoginStore, LOGIN_STATUS } from 'doublekit-portal-ui';
function createStores() {
    return {
        [LOGIN_STATUS]: new LoginStore(),
    };
}
const stores = createStores();
export default stores;
