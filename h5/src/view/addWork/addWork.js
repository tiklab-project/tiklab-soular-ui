/**
 * @name: addWork
 * @author mahai
 * @date 2022/5/21 5:54 PM
 * @description addWork
 */

import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Picker, Toast} from 'antd-mobile'
import {WORK_APP_LINK} from "../../constant";
import WorkService from '../../service/workService'

const  AddWork = props => {

    const [existProjectTypes,setExistProject] = useState([]);
    const [pickerVisible, setPickerVisible] = useState(false)

    useEffect(() => {
        WorkService.getWorkList().then(res =>{
            setExistProject(res.map(item => item.appType))
        })
    },[]);

    const onFinish = (values) => {
        const params = {
            ...values,
            appType: values.appType[0]
        }
        WorkService.createWorkAppLink(params).then(res => {
            if (!res.code) {
                Toast.show({
                    icon: 'success',
                    content: '保存成功',
                    afterClose: () => {
                        props.history.push('/')
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
    return(
        <Form
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
    )
};
export default AddWork
