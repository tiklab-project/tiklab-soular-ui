import React from "react";
import "./Tabs.scss";

/**
 * 标签
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Tabs = props =>{

    const {tabLis,type,onClick} = props

    return (
        <div className="soular-tabs">
            {
                tabLis.map(item=>(
                    <div
                        key={item.id}
                        className={`soular-tab ${type===item.id?"soular-active-tab":""}`}
                        onClick={type===item.id ? undefined : ()=>onClick(item)}
                    >{item.title}</div>
                ))
            }
        </div>
    )
}

export default Tabs
