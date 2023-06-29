import React from 'react'
import Tabs from '../../common/tabs/Tabs'

const Products = [
    {
        value: 'all',
        label: "所有应用",
    },
    {
        value: 'eas',
        label: "Eas",
    },
    {
        value: 'postin',
        label: "PostIn",
    },
    {
        value: 'teamwire',
        label: "TeamWire",
    },
    {
        value: 'teston',
        label: "TestOn",
    },
    {
        value: 'kanass',
        label: "Kanass",
    },
    {
        value: 'matflow',
        label: "MatFlow",
    },
]

const ProductsTypeTab = props => {

    const {type,onClick} = props

    const productsList = [
        {title: '全部', id: 'all',},
        {title: 'EAS', id: 'eas',},
        {title: 'TeamWire', id: 'teamwire',},
        {title: 'Kanass', id: 'kanass',},
        {title: 'PostIn', id: 'postin',},
        {title: 'TestOn', id: 'teston',},
        {title: 'MatFlow', id: 'matflow',},
        {title: 'XCode', id: 'xcode',},
        {title: 'XPack', id: 'xpack',},
    ]
    return (
        <Tabs
            type={type}
            tabLis={productsList}
            onClick={onClick}
        />
    )
}

export {
    Products,
    ProductsTypeTab
}
