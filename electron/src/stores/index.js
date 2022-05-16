/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-09 10:14
 * @description：index
 * @update: 2021-10-09 10:14
 */

import { EamStore, EAM_STORE } from 'doublekit-eam-ui';
function createStores() {
    return {
        [EAM_STORE]: new EamStore(),
    };
}
const stores = createStores();
export default stores;
