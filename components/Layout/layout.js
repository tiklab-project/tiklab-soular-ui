import React from 'react';
import Aside from './aside'
import {scopedClassMaker} from "../utils";
import './layout.scss'

const sc = scopedClassMaker('portal-layout');

const BasicLayout = (props) => {
    const {className, ...rest} = props;
    const children = Array.isArray(props.children) ? props.children.filter(Boolean) : props.children
    const hasAside = 'length' in children && children.reduce((result, node) => result || node.type === Aside, false)

    return(
        <div className={sc('', {extra: [className, hasAside && 'hasAside'].join(' ')})} {...rest}>
            {props.children}
        </div>
    )
}

export default BasicLayout
