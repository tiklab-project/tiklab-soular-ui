import React,{useState} from 'react';
import OpLogWidget from './OplogWidget';
import OplogFull from "./OplogFull";
import TodoWidget from './TodoWidget';
import LogDetail from "./LogDetail";
import QuickEntry from "./QuickEntry";
import './WidgetWork.scss';

/**
 * 工作台
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWork = props =>{

    const [moreOplog,setMoreOplog] = useState(false)
    const [viewDetail,setViewDetail] = useState(null);

    if (!!viewDetail) {
        return (
            <div className={'tiklab_fulloplog'}>
                <LogDetail data={viewDetail} history={props.history} closeDetailPage={()=>setViewDetail(null)}/>
            </div>
        )
    }

    if(moreOplog){
        return <OplogFull setMoreOplog={setMoreOplog}/>
    }

    return (
        <div className='workLayout'>
            <div className='workLayout-content'>
                <div className="dashboard-area">
                    <QuickEntry
                        history={props.history}
                    />
                    <TodoWidget
                        history={props.history}
                    />
                    <OpLogWidget
                        setMoreOplog={setMoreOplog}
                        setViewDetail={setViewDetail}
                    />
                </div>
            </div>
        </div>
    )
}


export default WidgetWork
