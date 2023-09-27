import React from "react";
import {LeftOutlined,RightOutlined} from "@ant-design/icons";
import "./Page.scss";

/**
 * 分页
 */
const Page = props =>{

    const {currentPage,changPage,page:{totalPage=1,totalRecord=1}} = props

    return totalPage > 1 && <div className="eas-page">
        <div className={`${currentPage===1?"eas-page-ban":"eas-page-allow"}`}
             onClick={()=>currentPage===1 ? null:changPage(currentPage-1)}
        ><LeftOutlined/></div>
        <div className="eas-page-current">{currentPage}</div>
        <div className='eas-page-line'> / </div>
        <div>{totalPage}</div>
        <div className={`${currentPage===totalPage?"eas-page-ban":"eas-page-allow"}`}
             onClick={()=>currentPage===totalPage? null:changPage(currentPage+1)}
        ><RightOutlined/></div>
        <div className='eas-page-record'>  共{totalRecord}条 </div>
    </div>
}

export default Page
