
import React, {useEffect} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import WorkService from '../api';
import {WORK_APP_SELECT} from 'tiklab-widget-ui/es/_utils/constant'

const AddWorkBench = props => {
    const {visible,setVisible, edit} = props;

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (edit) {
            form.setFieldsValue({
                appType: edit.appType,
                appUrl: edit.appUrl,
            })
        }
    }, [edit])

     // 提交表单
    const handleOk = () => {
        form.submit()
    };
     // 取消提交
    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    };

    const onFinish = values => {
        if (edit && edit.appUrl) {
            WorkService.updateWork({ ...values, id: edit.id }).then(res => {
                if (!res.code) {
                    message.success('成功!');
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        } else {
            WorkService.createWorkAppLink(values).then(res => {
                if (!res.code) {
                    message.success('成功!');
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        }
    };

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
            </Form>
        </Modal>
    )

}
export default AddWorkBench;