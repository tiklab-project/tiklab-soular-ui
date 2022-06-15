/**
 * @name: work
 * @author: mahai
 * @date: 2021-05-24 09:38
 * @description：work
 * @update: 2021-05-24 09:38
 */
import React, {Component} from 'react';
import {Button, Row, Space, Drawer} from "antd";
import {getUser} from 'doublekit-core-ui'
import RGL, { WidthProvider } from "react-grid-layout";
import workService from "./service/workService";

import {widgets} from "./widgets";
import './work.scss'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {MinusOutlined} from "@ant-design/icons";
const ReactGridLayout = WidthProvider(RGL);

class WorkBench extends Component{
    static defaultProps = {
        className: "layout",
        cols: 12,
        rowHeight: 30,
        onLayoutChange: function() {}
    };
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

            userLayoutId:""
        }

        this.onLayoutChange = this.onLayoutChange.bind(this);
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
                        layout:JSON.parse(res.data.layout),
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
        const {layout, userLayoutId} = this.state;
        let params = {
            uid: getUser().userId,
            layout:JSON.stringify(layout)
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
        const {layout} = this.state;
        const newLayout = layout.concat({
            i:item.code,
            x: 4,
            y: 0,
            w: 12,
            h: 8
        })
        this.setState({
            layout:newLayout
        })
    }


    removeLayout (i) {
        const layout = this.state.layout.filter(item => item.i !== i);
        this.setState({layout})
    }



    render() {
        const {gridConfig, layout, visible, visibleWidget, widgetList} = this.state;
        const layoutCode = layout.reduce((prev,cur) => {
            return prev.concat(cur.i)
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
                <ReactGridLayout
                    layout={layout}

                    {...gridConfig}
                    {...this.props}
                    onLayoutChange={this.onLayoutChange}
                >

                    {
                        layout.map(item => {
                            return (
                                <div key={item.i} className={ visible && 'item-gird'}>
                                    {
                                        visible && <div className={'item-remove'} onClick={this.removeLayout.bind(this,item.i)}>
                                            <MinusOutlined />
                                        </div>
                                    }
                                    {
                                        widgets[item.i]
                                    }
                                </div>
                            )
                        })
                    }
                </ReactGridLayout>

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
