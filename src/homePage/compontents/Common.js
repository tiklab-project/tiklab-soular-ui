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

const ProductsTitle = value =>{
    switch (value) {
        case "all":
            return "全部";
        case 'eas':
            return "EAS";
        case 'teamwire':
            return "TeamWire";
        case 'kanass':
            return "Kanass";
        case 'postin':
            return "PostIn";
        case 'teston':
            return "TestOn";
        case 'matflow':
            return "matflow";
        case 'xcode':
            return "XCode";
        case 'xpack':
            return "XPack";
        default:
            return "全部";
    }
}

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
            tabLis={productsList}
            type={type}
            onClick={onClick}
        />
    )
}

export {
    Products,
    ProductsTitle,
    ProductsTypeTab
}
