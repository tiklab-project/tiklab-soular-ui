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
        <div className="darth-tabs">
            {
                tabLis.map(item=>(
                    <div
                        key={item.id}
                        className={`darth-tab ${type===item.id?"darth-active-tab":""}`}
                        onClick={()=>onClick(item)}
                    >{item.title}</div>
                ))
            }
        </div>
    )
}

export default Tabs
