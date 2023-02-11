/**
 * @name: index
 * @author mahai
 * @date 2022/11/15 3:14 PM
 * @description index
 */
import React from 'react';
import {Table, Button} from 'antd';
import {Version} from 'tiklab-licence-ui';
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {ProductAuth} from 'tiklab-privilege-ui'

const VersionPage = () => {

    const dataSource = [
        {
            key: '1',
            feature: '表单上传',
            title:"基本功能",
            ce: false,
            ee: true,
            rowSpan: 4
        },
        {
            key: '2',
            title:"基本功能",
            feature: 'LDAP',
            ce: false,
            ee: true,
            rowSpan: 0
        },
        {
            key: '3',
            title:"基本功能",
            feature: '在线客服',
            ce: false,
            ee: true,
            rowSpan: 0
        },
        {
            key: '4',
            title:"基本功能",
            feature: '用户和部门',
            ce: true,
            ee: true,
            rowSpan: 0
        },
        {
            key: '5',
            title:"升级功能",
            feature: '插件',
            ce: false,
            ee: true,
            rowSpan: 2
        },
        {
            key: '6',
            title:"升级功能",
            feature: '权限',
            ce: true,
            ee: true,
            rowSpan: 0
        },
        {
            key: '7',
            title:"",
            feature: '',
            colSpan:4,
            rowSpan: 1,
        }
    ];

    const columns=[
        {
            title: '功能',
            dataIndex: 'title',
            key: 'title',
            colSpan: 2,
            render: (value, row, index) => {
                return {
                    children: value,
                    props: {
                        rowSpan: row.rowSpan,
                    },
                };
            },
        },
        {
            title: '功能点',
            dataIndex: 'feature',
            key: 'feature',
            colSpan: 0,
            render: (value, row, index) => {
                if (row.colSpan > 0) {
                    return null
                } else {
                    return value
                }
            },
        },
        {
            title: '社区版',
            dataIndex: 'ce',
            key: 'ce',
            render: (value, row, index) => {
                if (row.colSpan > 0) {
                    return null
                } else {
                    return value ? <CheckOutlined style={{color:"var(--tiklab-blue)", fontSize:'var(--tiklab-icon-size-16)'}}/> : <CloseOutlined style={{color:"red"}}/>
                }
            },
        },
        {
            title: '企业版',
            dataIndex: 'ee',
            key: 'ee',
            render: (value, row, index) => {
                if (row.colSpan > 0) {
                    return {
                        children: <Button type="primary">升级企业版</Button>,
                        props: {
                            colSpan : 4
                        },
                    }
                } else {
                    return value ? <CheckOutlined style={{color:"var(--tiklab-blue)",fontSize:'var(--tiklab-icon-size-16)'}}/> : <CloseOutlined style={{color:"red"}}/>
                }
            },
        },
    ]
    return (
        <div>
            <Version>
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </Version>
        </div>
    )

}

export default VersionPage
