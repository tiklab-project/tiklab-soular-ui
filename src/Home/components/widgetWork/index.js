

import React, {Component} from 'react';
import {getUser} from 'tiklab-core-ui';
import {findLayoutService, getWidgetListService} from "./api/workService";
import OpLogWidget from '../oplogWidget';
import TodoWidget from '../todoWidget';
import ProductsWidget from '../productsWidget';
import FullWorkTodo from "../full-work-todo";
import FullWorkOplog from "../fullWorkOplog";
import LogDetail from "../fullWorkOplog/components/LogDetail";
import './style/index.scss';

class WidgetWork extends Component{
    constructor(props) {
        super(props);
        this.state = {
            layout:[],
            gridConfig:{
                isDraggable: false,
                isResizable: false,
            },
            visible:false,
            visibleWidget: false,
            widgetList:[],
            userLayoutId:"",
            leftList:[],
            rightList:[],
            bgroup:props.bgroup || 'eas',
            fullTodo: false, //点击任务待办一页显示待办
            fullOplog: false,

            // 是否要标记
            isCe: props.isCe || true,

            showOplogDetail: null,
        }
    }


    componentDidMount() {
        getWidgetListService({}).then(res => {
            if (res.code === 0) {
                this.setState({
                    widgetList: res.data
                })
            }
        })
        this.getFindUserLayout()
    }


    getFindUserLayout() {
        const params = {
            uid: getUser().userId
        }
        findLayoutService(params).then(res => {
            if (res.code === 0) {
                if (res.data) {
                    this.setState({
                        leftList:res.data.leftDashboard ? JSON.parse(res.data.leftDashboard) : [],
                        rightList:res.data.rightDashboard ? JSON.parse(res.data.rightDashboard) : [],
                        userLayoutId: res.data.id
                    })
                }
            }
        })
    }

    changeTodo() {
        this.setState({
            fullTodo: !this.state.fullTodo
        })
    }

    changeOplog(){
        this.setState({
            fullOplog: !this.state.fullOplog
        })
    }

    setOplogDetail(item){
        this.setState({
            showOplogDetail: item
        })
    }
    closeOplogDetailPage(){
        this.setState({
            showOplogDetail: null
        })
    }

    tagLabel(value){
        switch (value) {
            case "all":
                return "全部";
            case 'eas':
                return "账号中心";
            case 'teamwire':
                return "项目管理";
            case 'kanass':
                return "知识管理";
            case 'postin':
                return "接口管理";
            case 'teston':
                return "自动化测试";
            case 'matflow':
                return "流水线";
            case 'gitpro':
                return "代码管理";
            case 'hakkar':
                return "制品管理";
            default:
                return "全部";
        }
    }

    handelRender() {
        const {fullTodo, fullOplog, bgroup, showOplogDetail} = this.state;
        const {children} = this.props;

        if (!fullOplog && !fullTodo && !!showOplogDetail) {
            return <LogDetail closeDetailPage={this.closeOplogDetailPage.bind(this)} history={this.props.history} data={showOplogDetail} tagLabel={this.tagLabel.bind(this)}/>
        }

        if (fullTodo && !fullOplog) {
            return  <FullWorkTodo bgroup={bgroup} changeTodo={this.changeTodo.bind(this)} history={this.props.history}/>
        }
        if (!fullTodo && fullOplog) {
            return  <FullWorkOplog changeOplog={this.changeOplog.bind(this)} history={this.props.history}/>
        }
        return (
            <div className="dashboard-area">
                {
                    children ? children : <ProductsWidget bgroup={this.state.bgroup} history={this.props.history}/>
                }
                <TodoWidget bgroup={this.state.bgroup} isCe={this.state.isCe} changeTodo={this.changeTodo.bind(this)} history={this.props.history}/>
                <OpLogWidget
                    bgroup={this.state.bgroup}
                    isCe={this.state.isCe}
                    changeOplog={this.changeOplog.bind(this)}
                    showOplogDetail={this.setOplogDetail.bind(this)}
                    history={this.props.history}
                />
            </div>
        )
    }


    render() {
        return(
            <section className='workLayout'>
                <section className='workLayout-content'>
                    {this.handelRender()}
                </section>
            </section>
        )
    }
}

export default WidgetWork
