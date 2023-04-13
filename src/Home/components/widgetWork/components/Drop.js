/**
 * @name: Drop
 * @author mahai
 * @date 2022/7/5 2:37 PM
 * @description Drop
 */
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Button, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import './drop.scss';
const grid = 8

/**
 * 重新记录数组顺序
 * @param list
 * @param startIndex
 * @param endIndex
 * @returns {unknown[]}
 */
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * 设置样式
 * @param isDragging
 * @param draggableStyle
 * @returns {*&{padding: number, margin: string, background: (string), userSelect: string}}
 */
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    // 拖拽的时候背景变化
    background: isDragging ? "lightgreen" : "#ffffff",
    ...draggableStyle
});

const getListStyle = () => ({
    // background: 'black',
    padding: grid,
    width: '100%'
});

export default class ReactBeautifulDnd extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.props.data,
            result.source.index,
            result.destination.index
        );

        this.props.dropEnd(items);
    }


    deleteWidget(id) {
        const data = this.props.data.filter(item => item.id !== id);
        this.props.dropEnd(data);
    }
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <center>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                //provided.droppableProps应用的相同元素.
                                {...provided.droppableProps}
                                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                ref={provided.innerRef}
                                style={getListStyle(snapshot)}
                            >
                                {this.props.data.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                className='drop-item'
                                            >
                                                <div className='drop-header'>
                                                    <div className="drop-header-name">{item.name}</div>
                                                    <Tooltip title="移除">
                                                        <Button shape="circle" icon={<DeleteOutlined />} onClick={this.deleteWidget.bind(this,item.id)}/>
                                                    </Tooltip>
                                                </div>
                                                <div className="drop-body"/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </center>
            </DragDropContext>
        );
    }
}
