/**
 * @name: editWork
 * @author mahai
 * @date 2022/5/23 10:41 AM
 * @description editWork
 */

import React, {useState, useEffect} from "react";
import {Button, Form, Input, NavBar, Picker, Toast} from "antd-mobile";
import {WORK_APP_LINK} from "../../../constant";
import WorkService from "../../../service/workService";
import '../list.scss';
const EditWork = (props) => {
    const {match:{params}} = props;
    const [form] = Form.useForm();
    const [existProjectTypes,setExistProject] = useState([]);
    const [pickerVisible, setPickerVisible] = useState(false);
    useEffect(() => {

        if (params.id) {
            WorkService.findWorkByID(params.id).then(res => {
                WorkService.getWorkList().then(apps =>{
                    const codes = apps.map(item => item.appType).filter(code => code !== res.appType)
                    setExistProject(codes)
                });

                form.setFieldsValue({
                    appType: [res.appType],
                    appUrl: res.appUrl,
                })
            })
        }
    },[]);

    const onFinish = (values) => {
        const param = {
            ...values,
            appType: values.appType[0],
            id:params.id
        }
        WorkService.updateWork(param).then(res => {
            if (!res.code) {
                Toast.show({
                    icon: 'success',
                    content: '编辑成功',
                    afterClose: () => {
                        onGoBack()
                    }
                })
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '接口请求失败',
                })
            }
        })
    }
    const onGoBack = () => {
        props.history.goBack()
    }
    return(
        <div className={'project'}>
            <NavBar
                backArrow={true}
                onBack={onGoBack}
            >
                编辑应用
            </NavBar>
            <Form
                form={form}
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item
                    name='appType'
                    label='应用名称'
                    rules={[{ required: true, message: '应用名称不能为空' }]}
                    arrow={true}
                    onClick={() => {
                        setPickerVisible(true)
                    }}
                    trigger='onConfirm'
                >

                    <Picker
                        visible={pickerVisible}
                        onClose={() => {
                            setPickerVisible(false)
                        }}
                        columns={WORK_APP_LINK(existProjectTypes)}
                    >
                        {
                            value => value.length>0 ?value[0].label :'选择应用名称'
                        }
                    </Picker>
                </Form.Item>

                <Form.Item
                    name='appUrl'
                    label='应用链接地址'
                    rules={[{ required: true, message: "请输入地址"},{ type: 'url', message: "应用链接地址无效" }]}
                >
                    <Input placeholder='请输入地址' />
                </Form.Item>
            </Form>
        </div>
    )
}
export default EditWork
