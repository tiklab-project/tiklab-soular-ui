
import React from 'react'
import { scopedClassMaker } from '../utils'



const sc = scopedClassMaker('portal-layout')

const Aside = (props) => {
    const {className, ...rest} = props
    return (
        <div className={sc('aside', {extra: className})} {...rest}>{rest.children}</div>
    )
}

export default Aside
