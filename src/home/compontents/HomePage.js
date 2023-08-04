import React from "react";
import WidgetWork from "./WidgetWork";
// import ProductsWidget from "./ProductsWidget";

const HomePage = props =>{
    return  <WidgetWork {...props}>
                {/*<ProductsWidget  history={props.history}/>*/}
            </WidgetWork>
}

export default HomePage
