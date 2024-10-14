import React from "react";
import ReactDOM from "react-dom";
import {enableAxios} from "tiklab-core-ui";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {orgStores} from "tiklab-user-ui/es/store";
import {store} from "./store";
import {observer} from "mobx-react";
import routes from "./routers";
import App from "./app";

enableAxios()
const Index = observer(() => {

    const allStore = {
        ...privilegeStores,
        ...orgStores,
        ...store,
    }

    return (
        <App
            routes={routes}
            allStore={allStore}
        />
    )
})

ReactDOM.render(<Index/>, document.getElementById("root"))

if(module.hot){
    module.hot.accept()
}
