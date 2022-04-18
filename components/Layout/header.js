import React from 'react'
import {scopedClassMaker} from "../utils";

const sc = scopedClassMaker('portal-layout')

const Header = (props) => {

    const {headerStyle} = props;
    return (
        <div className={sc('header')} style={headerStyle}>{props.children}</div>
    )
}
export default Header
