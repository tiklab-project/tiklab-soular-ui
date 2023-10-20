import React,{useState} from 'react';
import OpLogWidget from './OplogWidget';
import OplogFull from "./OplogFull";
import TodoWidget from './TodoWidget';
import TodoFull from "./TodoFull";
import LogDetail from "./LogDetail";
// import ProductsWidget from "./ProductsWidget";
import './WidgetWork.scss';

/**
 * 工作台
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WidgetWork = props =>{

    const [moreTodo,setMoreTodo] = useState(false)
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

    if(moreTodo){
        return <TodoFull setMoreTodo={setMoreTodo}/>
    }

    return (
        <div className='workLayout'>
            <div className='workLayout-content'>
                <div className="dashboard-area">
                    {/*<ProductsWidget*/}
                    {/*    history={props.history}*/}
                    {/*/>*/}
                    <TodoWidget
                        history={props.history}
                        setMoreTodo={setMoreTodo}
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
