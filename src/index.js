import React from "react";
import ReactDOM from "react-dom";
import {enableAxiosCE} from "tiklab-core-ui";
import {privilegeStores} from "tiklab-privilege-ui/es/store";
import {orgStores} from "tiklab-user-ui/es/store";
import {observer} from "mobx-react";
import routes from "./routers";
import App from "./app";

enableAxiosCE()
const Index = observer(() => {

    const allStore = {
        ...privilegeStores,
        ...orgStores,
    }

    return  <App
                routes={routes}
                allStore={allStore}
            />
})

ReactDOM.render(<Index/>, document.getElementById("root"))

if(module.hot){
    module.hot.accept()
}
