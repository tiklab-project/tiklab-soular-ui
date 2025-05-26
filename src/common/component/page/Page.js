import React from "react";
import {LeftOutlined,RightOutlined,SyncOutlined} from "@ant-design/icons";
import "./Page.scss";

/**
 * 分页
 */
const Page = props =>{

    const {currentPage,changPage,page:{totalPage=1,totalRecord=1}} = props

    return totalPage > 1 && (
        <div className="soular-page">
            <div className='soular-page-record'>  共{totalRecord}条 </div>
            <div className={`${currentPage===1?"soular-page-ban":"soular-page-allow"}`}
                 onClick={()=>currentPage===1 ? null:changPage(currentPage-1)}
            ><LeftOutlined/></div>
            <div className="soular-page-current">{currentPage}</div>
            <div className='soular-page-line'> / </div>
            <div>{totalPage}</div>
            <div className={`${currentPage===totalPage?"soular-page-ban":"soular-page-allow"}`}
                 onClick={()=>currentPage===totalPage? null:changPage(currentPage+1)}
            ><RightOutlined/></div>
            <div className='soular-page-fresh' onClick={()=>changPage(1)}>
                <SyncOutlined />
            </div>
        </div>
    )
}

export default Page
