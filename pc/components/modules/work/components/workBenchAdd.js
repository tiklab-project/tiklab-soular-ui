/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-25 10:16:35
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-25 10:35:25
 */
import React, {useEffect, memo} from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import WorkService from '../service/workService'

const AddWorkBench = props => {
    const {visible,setVisible, callBack, edit, applicationList=[]} = props;
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    useEffect(() => {
        if (edit) {
            form.setFieldsValue({
                appType: edit.appType,
                appUrl: edit.appUrl
            })
        }
    }, [edit])

     // TODO 提交表单
    const handleOk = () => {
        form.submit()
    };
     // TODO 取消提交
    const handleCancel = () => {
        form.resetFields()
        callBack()
        setVisible(false)
    };

     // TODO 完成表单提交的接口
    const onFinish = values => {
        if (edit) {
            WorkService.updateWork({ ...values, id: edit.id }).then(res => {
                if (!res.code) {
                    message.success('成功!');
                    callBack()
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        } else {
            WorkService.createWorkAppLink(values).then(res => {
                if (!res.code) {
                    message.success('成功!');
                    callBack()
                    setVisible(false)
                } else {
                    message.error('失败!');
                }
            })
        }

    };
    const WORK_APP_LINK = [
        {
            label: '项目管理',
            value: 'project',
            disabled: applicationList.includes('project')
        },
        {
            label: 'API BOX',
            value: 'apibox',
            disabled: applicationList.includes('apibox')
        },
        {
            label: 'Jtest',
            value: 'jtest',
            disabled: applicationList.includes('jtest')
        },
        {
            label: '知识库',
            value: 'wiki',
            disabled: applicationList.includes('wiki')
        },
    ];
    return(
        <Modal
            title= "添加项目"
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
                    <Select options={WORK_APP_LINK}/>
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
