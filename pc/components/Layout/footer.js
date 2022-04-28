import React from 'react'
import { scopedClassMaker } from '../utils'


const sc = scopedClassMaker('portal-layout')

const Footer = (props) => {
    const {className, ...rest} = props
    return (
        <div className={sc('footer', {extra: className})} {...rest}>{rest.children}</div>
    )
}

export default Footer
