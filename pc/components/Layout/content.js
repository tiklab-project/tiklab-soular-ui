import React from 'react'
import { scopedClassMaker } from '../utils'


const sc = scopedClassMaker('portal-layout')

const Content = (props) => {
    const {className, ...rest} = props
    return (
        <div className={sc('content', {extra: className})} {...rest}>{rest.children}</div>
    )
}

export default Content
