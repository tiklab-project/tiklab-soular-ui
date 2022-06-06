
import React, {useEffect, useState} from 'react';
import { Modal, Form, Input, Select, message, Upload } from 'antd';
import WorkService from '../service/workService'
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {getUser} from "doublekit-core-ui";

const WORK_APP_SELECT = [
    {
        label: '项目管理',
        value: 'project',
    },
    {
        label: 'API BOX',
        value: 'apibox',
    },
    {
        label: 'Jtest',
        value: 'jtest',
    },
    {
        label: '知识库',
        value: 'wiki',
    },
    {
        label: '自动化部署',
        value: 'pipleine',
    },
];
const AddWorkBench = props => {
    const {visible,setVisible, edit} = props;
    const [fileList,setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (edit) {
            let file = []
            if (edit.iconUrl) {
                file = [
                    {
                        uid: '1',
                        name: edit.appType,
                        status: 'done',
                        url: edit.iconUrl
                    }
                ]
            }
            form.setFieldsValue({
                appType: edit.appType,
                appUrl: edit.appUrl,
                iconUrl: file
            })
            setFileList(file)
        }
    }, [edit])

     // TODO 提交表单
    const handleOk = () => {
        form.submit()
    };
     // TODO 取消提交
    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    };

    const onFinish = values => {
        let imgUrl = '';
        if (values.iconUrl.length>0) {
            imgUrl = values.iconUrl[0].response?values.iconUrl[0].response.data.fileName : values.iconUrl[0].url
        }
        const params = {
            ...values,
            iconUrl:imgUrl
        }
        if (edit && edit.appUrl) {
            WorkService.updateWork({ ...params, id: edit.id }).then(res => {
                if (!res.code) {
                    message.success('成功!');
                    setFileList([])
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        } else {
            WorkService.createWorkAppLink(params).then(res => {
                if (!res.code) {
                    setFileList([])
                    message.success('成功!');
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        }
        // if (edit) {
        //     WorkService.updateWork({ ...values, id: edit.id }).then(res => {
        //         if (!res.code) {
        //             message.success('成功!');
        //             setVisible(false)
        //         } else {
        //             message.error('失败!');
        //         }
        //     })
        // } else {

        // }

    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const fileChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        setFileList(info.fileList);
        if (info.file.status === 'done') {
            const { response } = info.file;
            setLoading(false)
            if (response.code) {
                setFileList([])
                message.error('上传失败');
            }
        }
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const uploadUrl = base_url === '/' ? window.location.origin : base_url
    return(
        <Modal
            title= "设置项目"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            destroyOnClose={true}
            preserve={false}
        >
            <Form
                {...layout}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label= "标题"
                    name="appType"
                    rules={[{ required: true, message: '用户名不能包含非法字符，如&,%，&，#……等' }]}
                >
                    <Select options={WORK_APP_SELECT} disabled/>
                </Form.Item>

                <Form.Item
                    label= "应用链接地址"
                    name="appUrl"
                    rules={[{ required: true, message: "请填写地址"},{ type: 'url', message: "应用链接地址无效" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label= "应用封面"
                    name="iconUrl"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: '请上传图片!'
                        }
                    ]}
                >
                    <Upload
                        name="uploadFile"
                        listType="picture-card"
                        accept="image/*"
                        action={uploadUrl + (uploadUrl.substring(uploadUrl.length-1,uploadUrl.length) === '/' ? '/dfs/upload' : '/dfs/upload')}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onChange={fileChange}
                        headers={
                            {
                                ticket: getUser().ticket
                            }
                        }
                    >
                        {
                            fileList.length === 0 && <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        }
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )

}
export default AddWorkBench;
