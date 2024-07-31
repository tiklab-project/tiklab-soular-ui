import {createContext} from "react";
import {HOME_STORE,HomeStore} from "./home/store/HomeStore";

function createStores() {
    return {
        [HOME_STORE]:new HomeStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
