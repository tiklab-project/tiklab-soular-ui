/**
 * @name: index
 * @author mahai
 * @date 2022/8/1 10:31 AM
 * @description index
 */
import React, {useEffect, useState} from "react";
import { Select, Button, Row, Col, Form, Input, Table, Space} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import BreadCrumb from "../../../common/breadCrumb";
import BaseModal from "../../../common/baseModal";
import {
    createWidgetService,
    deleteWidgetService,
    findWorkWidgetPageService,
    getWidgetListService,
    updateWidgetService
} from "../widget-work/api/workService";
import {PROJECT_NAME} from '../../../utils/constant'

import deleteSuccessReturnCurrenPage from "../../../utils/tablePage";
import './style/index.scss';

const { Option } = Select;


const breadcrumb = [{
    disabled:true,
    breadcrumbName: 'Wiget管理 '
}, {
    path: 'list',
    breadcrumbName: '列表'
}];
const WidgetMangent = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    const [data,setData] = useState([]);
    const [detail,setDetail] = useState({});
    const [visible,setVisible] = useState(false);

    let initParams = {
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage,
        }
    }
    const [params,setParams] = useState(initParams)
    // 编辑的数据
    const [editId,setEditId] = useState(null);

    useEffect(() => {
        findWorkWidgetPageService(params).then(res => {
            if (res.code === 0) {
                setData(res.data.dataList);
                setCount(res.data.totalRecord)
            }
        })
    }, [params]);

    const columns = [
        {
            title: 'Widget名称',
            dataIndex: 'name',
        },
        {
            title: 'Widget编码',
            dataIndex: 'code',
        },
        {
            title: '所属项目',
            dataIndex: 'type',
        },
        {
            title: '操作',
            key: 'action',
            width:'10%',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => onEdit(record)} style={{fontSize:'var(--tiklab-icon-size-16)'}}/>}/>
                    <DeleteOutlined onClick={() => onDelete(record.id)} style={{fontSize:'var(--tiklab-icon-size-16)'}}/>}/>
                </Space>
            ),
        },
    ]

    const getWidgets= () => {
        getWidgetListService(params).then(res => {
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
        deleteWidgetService(id).then(res => {
            if (res.code === 0) {
                const page = deleteSuccessReturnCurrenPage(count, pageSize, currentPage);
                const newParams = {
                    ...params,
                    pageParam: {
                        pageSize: pageSize,
                        currentPage:page
                    }
                }
                setCurrentPage(page)
                setParams(newParams)
            }
        })
    }

    const onEdit = (item) => {
        form.setFieldsValue({
            name: item.name,
            code: item.code,
            dashboardType:item.dashboardType,
            type:item.type,
            webUrl:item.webUrl,
            apiUrl: item.apiUrl,
            description: item.description
        })
        setEditId(item.id)
        setVisible(true)
    }

    const onChange = (value) => {
        if (value && value !== 'all') {
            setParams({...params, type:value})
        } else {
            setParams(initParams)
        }
    }

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editId) {
                updateWidgetService({...values, id:editId}).then(res=>{
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
                createWidgetService(values).then(res=>{
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

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            }
        }
        setParams(newParams)
    }
    return(
        <div className='widgetMangent'>
            <div className='widgetMangent_content'>
                <Row>
                    <Col span={24}>
                        <BreadCrumb routes={breadcrumb}/>
                        <Row justify={'space-between'} style={{paddingBottom:16}}>
                            <Select
                                onChange={onChange}
                                allowClear
                                placeholder={"请选择类型"}
                                style={{width:240}}
                                defaultValue={"all"}
                            >
                                <Option value={"all"} key={"all"}>所有</Option>
                                {
                                    Object.keys(PROJECT_NAME).map(key => {
                                        return <Option value={key} key={key}>{PROJECT_NAME[key]}</Option>
                                    })
                                }
                            </Select>
                            <Button onClick={onCreate} type={'primary'} icon={<PlusOutlined style={{fontSize:'var(--tiklab-icon-size-16)'}}/>}>
                                创建
                            </Button>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    dataSource={data}
                                    columns={columns}
                                    rowKey={r => r.id}
                                    tableLayout="fixed"
                                    pagination={{
                                        current:currentPage,
                                        pageSize: pageSize,
                                        total: count,
                                    }}
                                    onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <BaseModal
                visible={visible}
                title={"Widget"}
                destroyOnClose={true}
                okText={t("tiklab-actions.save")}
                cancelText={t("tiklab-actions.close")}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
            >
                <Form
                    form={form}
                    preserve={false}
                    layout={'vertical'}
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
                            {
                                Object.keys(PROJECT_NAME).map(key => {
                                    return <Option value={key} key={key}>{PROJECT_NAME[key]}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dashboardType"
                        label={"布局类型"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: '请选择布局类型'
                                }
                            ]
                        }
                    >
                        <Select
                            placeholder={"请选择布局类型"}
                            style={{width:'100%'}}
                        >
                            <Option value="normal">通用</Option>
                            <Option value="left">左侧</Option>
                            <Option value="right">右侧</Option>
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
                        name="webUrl"
                        label={"页面跳转url"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'url前缀'
                                },
                                { type: 'url', message: "无效的url" }
                            ]
                        }
                    >
                        <Input  placeholder={"页面跳转url"}/>
                    </Form.Item>
                    <Form.Item
                        name="apiUrl"
                        label={"接口url"}
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'url前缀'
                                },
                                { type: 'url', message: "无效的url" }
                            ]
                        }
                    >
                        <Input  placeholder={"接口url"}/>
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
            </BaseModal>
        </div>
    )
}
export default WidgetMangent;
