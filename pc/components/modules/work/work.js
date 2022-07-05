/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {Component} from 'react';
import {Button, Row, Space, Drawer, Empty} from "antd";
import {getUser} from 'doublekit-core-ui'
import workService from "./service/workService";
import {widgets} from "./widgets";
import './work.scss'
import ReactBeautifulDnd from "./components/Drop";

class WorkBench extends Component{

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
            rightList:[]
        }

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.savaRightDndData = this.savaRightDndData.bind(this);
        this.savaLeftDndData = this.savaLeftDndData.bind(this);
    }
    componentDidMount() {
        workService.getWidgetList({}).then(res => {
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
        workService.findLayout(params).then(res => {
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

    onLayoutChange(layout) {
        this.setState({ layout });
        this.props.onLayoutChange(layout);
    }

    onCancel() {
        this.setState({
            visible:false,
            gridConfig:{
                isDraggable: false,
                isResizable: false,
            }
        })
    }

    onSaveLayout() {
        const {leftList,rightList, userLayoutId} = this.state;
        let params = {
            uid: getUser().userId,
            leftDashboard:JSON.stringify(leftList),
            rightDashboard: JSON.stringify(rightList),
        }
        if (!userLayoutId) {
            workService.createLayout(params).then(res => {
                if (res.code === 0) {
                    this.getFindUserLayout()
                    this.onCancel()
                }
            })
        } else {
            workService.updateLayout({...params, id: userLayoutId}).then(res => {
                if (res.code === 0) {
                    this.getFindUserLayout()
                    this.onCancel()
                }
            })
        }

    }

    onEditWork(){
        this.setState({
            visible:true,
            gridConfig:{
                isDraggable: true,
                isResizable: true,
            }
        })
    }

    onQuickEditWork(){
        this.setState({
            visible:true,
            gridConfig:{
                isDraggable: true,
                isResizable: true,
            },
            visibleWidget:true
        })
    }

    onOpenDrawer(){
        this.setState({
            visibleWidget:true
        })
    }
    onCloseDrawer(){
        this.setState({
            visibleWidget:false
        })
    }

    addWork(item){
        const {rightList, leftList} = this.state;
        if (item.dashboardType === 'right') {
            this.setState({
                rightList: rightList.concat(item)
            })
        } else {
            this.setState({
                leftList: leftList.concat(item)
            })
        }
    }


    savaLeftDndData(afterData){
        this.setState({
            leftList:afterData
        })
    }
    savaRightDndData(afterData){
        this.setState({
            rightList:afterData
        })
    }



    render() {
        const {leftList, rightList, visible, visibleWidget, widgetList} = this.state;
        const layoutCode =leftList.concat(rightList).reduce((prev,cur) => {
            return prev.concat(cur.code)
        }, []);
        return(
            <section className='workLayout'>
                <Row justify={'end'}>
                    <Space>
                        {
                            visible && <Button onClick={this.onOpenDrawer.bind(this)}>添加某块</Button>
                        }
                        {
                            visible && <Button onClick={this.onCancel.bind(this)}>取消</Button>
                        }
                        {
                            visible && <Button type={'primary'} onClick={this.onSaveLayout.bind(this)}>保存</Button>
                        }
                        {
                            !visible && <Button onClick={this.onEditWork.bind(this)}>编辑工作台</Button>
                        }
                    </Space>
                </Row>

                <section className='workLayout-content'>
                    <div className="dashboard-area">
                        <div className="dashboard_left">
                            {
                                visible ? <ReactBeautifulDnd data={leftList} dropEnd={this.savaLeftDndData}/> :

                                    <>
                                        {
                                            leftList.map(item => {
                                                const webUrl = item.webUrl;
                                                const apiUrl = item.apiUrl;
                                                return (
                                                    <div key={item.id}>
                                                        {widgets(webUrl, apiUrl)[item.code]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </>

                            }
                        </div>
                        <div className="dashboard_right">
                            {
                                visible ?
                                    <ReactBeautifulDnd data={rightList} dropEnd={ this.savaRightDndData}/>
                                    :
                                    <>
                                        {
                                            rightList.map(item => {
                                                const webUrl = item.webUrl;
                                                const apiUrl = item.apiUrl;
                                                return (
                                                    <div key={item.id}>
                                                        {widgets(webUrl, apiUrl)[item.code]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                            }

                        </div>
                    </div>
                </section>

                {
                    [...leftList, ...rightList].length === 0 && !visible && <Empty
                        description={
                            <span>你的工作台没有配置<br/><Button type="link" onClick={this.onQuickEditWork.bind(this)}>快捷编辑</Button></span>
                        }
                    />
                }
                <Drawer
                    title={`添加Widget小组件`}
                    placement="right"
                    size={'large'}
                    onClose={this.onCloseDrawer.bind(this)}
                    visible={visibleWidget}
                >
                    {
                        widgetList.map(item =>{
                            return (
                                <div className={'drawerItem'} key={item.id}>
                                    <div>
                                        <div className={'drawerItem-title'}>{item.name}</div>
                                        <div className="drawerItem-desc">{item.description}</div>
                                    </div>
                                    {
                                        layoutCode.includes(item.code) ? <span>已添加到工作台编辑区</span>
                                            :
                                            <Button type={'link'} onClick={this.addWork.bind(this, item)}>添加到工作台</Button>

                                    }
                                </div>
                            )
                        })
                    }
                </Drawer>
            </section>
        )
    }
}

export default WorkBench
