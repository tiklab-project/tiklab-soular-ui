/**
 * @name: widgetMangent
 * @author mahai
 * @date 2022/6/15 2:51 PM
 * @description widgetMangent
 */


import React, {useEffect, useState} from "react";
import {List, Select, Button, Descriptions, Empty, Divider, Modal, Form, Input} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import './widgetManget.scss';
import {useTranslation} from "react-i18next";
import workService from "../work/service/workService";

const { Option } = Select;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 18},
};

const PROJECT_NAME = {
    "portal":"Portal",
    "project":"项目管理",
    "apibox":"ApiBox"
}
const WidgetMangent = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [data,setData] = useState([]);
    const [detail,setDetail] = useState({});
    const [visible,setVisible] = useState(false);
    const [params,setParams] = useState({})
    // 编辑的数据
    const [editId,setEditId] = useState(null);

    useEffect(() => {
        workService.getWidgetList(params).then(res => {
            if (res.code === 0) {
                setData(res.data)
                setDetail(res.data[0] || {})
            }
        })
    }, [params]);


    const getWidgets= () => {
        workService.getWidgetList(params).then(res => {
            if (res.code === 0) {
                setData(res.data)
            }
        })
    }


    const onCreate = () => {
        setVisible(true)
    }
    const onDetail = (item) => {
        setDetail(item)
    }

    const onDelete = (id) => {
        workService.deleteWidget(id).then(res => {
            if (res.code === 0) {
                const newData = data.filter(item => item.id !== id);
                setData(newData)
                if (detail.id === id) {
                    setDetail(newData[0] || {})
                }
            }
        })
    }

    const onEdit = (item) => {
        form.setFieldsValue({
            name: item.name,
            code: item.code,
            type:item.type,
            description: item.description
        })
        setEditId(item.id)
        setVisible(true)
    }

    const onChange = (value) => {
        if (value) {
            setParams({type:value})
        } else {
            setParams({})
        }
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editId) {
                workService.updateWidget({...values, id:editId}).then(res=>{
                    if (res.code === 0) {
                        if (editId === detail.id) {
                            setDetail({...values, id:editId})
                        }
                        setVisible(false)
                        getWidgets();
                        setEditId(null)
                    } else {
                        return message.error(res.msg)
                    }
                })
            } else {
                workService.createWidget(values).then(res=>{
                    if (res.code === 0) {
                        setVisible(false)
                        getWidgets();
                        setEditId(null)
                    } else {
                        return message.error(res.msg)
                    }
                })
            }


        })

    }

    const handleCancel = () => {
        setVisible(false)
        setEditId(null)
    }
    return(
        <div className='widgetMangent'>
            <div className='left'>
                <div className='search'>
                    <Select
                        onChange={onChange}
                        allowClear
                        placeholder={"请选择类型"}
                        style={{width:'100%', paddingRight:4}}
                    >
                        <Option value="portal">Portal</Option>
                        <Option value="project">项目管理</Option>
                        <Option value="apibox">ApiBox</Option>
                    </Select>
                    <Button onClick={onCreate}>
                        创建
                    </Button>
                </div>

                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={
                                onEdit?
                                    [
                                        <EditOutlined onClick={() => onEdit(item)}/>,
                                        <DeleteOutlined onClick={() => onDelete(item.id)}/>
                                    ]
                                    :
                                    [
                                        <DeleteOutlined onClick={() => onDelete(item.id)}/>
                                    ]
                            }
                        >
                            <div className='listName' onClick={() => onDetail(item)}>
                                {item.name}
                            </div>

                        </List.Item>
                    )}
                />
            </div>
            <Divider type="vertical" style={{height:"100%"}} />
            <div className='right'>
                <Descriptions
                    title={"TODO 导航栏组件提取"}
                    bordered
                    column={1}
                    labelStyle={{width:160}}
                >
                    {
                        JSON.stringify(detail) !== "{}" &&
                        <Descriptions.Item label={'Widget名称'}>{detail.name}</Descriptions.Item>
                    }
                    {
                        JSON.stringify(detail) !== "{}" &&
                        <Descriptions.Item label={'Widget编码'}>{detail.code}</Descriptions.Item>
                    }
                    {
                        JSON.stringify(detail) !== "{}" &&
                        <Descriptions.Item label={'所属项目'}>{PROJECT_NAME[detail.type]}</Descriptions.Item>
                    }
                    {
                        JSON.stringify(detail) !== "{}" &&
                        <Descriptions.Item label={'描述'}>{detail.description}</Descriptions.Item>
                    }
                    {
                        JSON.stringify(detail) === "{}" &&
                        <Descriptions.Item >
                            <Empty
                                description={
                                    <span>widget列表为空，你需要创建一个</span>
                                }
                            />
                        </Descriptions.Item>

                    }
                </Descriptions>
            </div>

            <Modal
                visible={visible}
                closable={false}
                title={"Widget"}
                destroyOnClose={true}
                okText={t("doublekit-actions.save")}
                cancelText={t("doublekit-actions.close")}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
            >
                <Form
                    {...layout}
                    form={form}
                    preserve={false}
                >
                    <Form.Item
                        name="name"
                        label={"Widget名称"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Widget名称必填'
                                }
                            ]
                        }
                    >
                        <Input  placeholder={"请输入Widget名称"}/>
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label={"所属项目"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: '请选择类型'
                                }
                            ]
                        }
                    >
                        <Select
                            placeholder={"请选择类型"}
                            style={{width:'100%'}}
                        >
                            <Option value="portal">Portal</Option>
                            <Option value="project">项目管理</Option>
                            <Option value="apibox">ApiBox</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label={"Widget编码"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Widget编码'
                                }
                            ]
                        }
                    >
                        <Input  placeholder={"请输入Widget编码"}/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={"描述"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: '请输入描述'
                                }
                            ]
                        }
                    >
                        <Input  placeholder={"请输入描述"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default WidgetMangent;
