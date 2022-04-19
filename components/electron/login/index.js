/**
 * @name: index
 * @author: mahai
 * @date: 2021-10-11 09:30
 * @description：index
 * @update: 2021-10-11 09:30
 */
import React from 'react'
import {Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {Axios} from "doublekit-core-ui";

import styles from './login.module.scss'

const LoginElectron = (props) => {
    const {handleWindow, logo, portalLoginStore} = props;

    console.log(portalLoginStore, 'LoginElectron')
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let  params = {
            account: values.username,
            password: values.password
        }
        Axios.post('passport/login', params).then(res => {
            if(res.code) {
                return message.error(res.msg)
            } else  {
                portalLoginStore.login(res.data)
                if (typeof handleWindow === 'function') {
                    handleWindow()
                }
                if (props.loginGo) {
                    return props.history.push(props.loginGo)
                }
                return props.history.push('/')
            }
        })
    };
    return (
        <div className={styles.wrap}>
            <img src={logo}  alt="Grapefruit slice atop a pile of other slices" className={styles.logo}/>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: '手机号或者邮箱必填!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value,callback) {
                                // if(value) {
                                //     const vaild = phoneReg.test(value) || emailReg.test(value)
                                //     if (vaild) {
                                //         return Promise.resolve();
                                //     }
                                //     return Promise.reject('请输入手机号码或邮箱格式不正确');
                                // }
                                callback()
                            },
                        }),
                    ]}

                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="邮箱"
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '输入密码!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        size={'large'}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Button
                    htmlType="submit"
                    type='primary'
                    className={styles.btn}
                >
                    登录
                </Button>
            </Form>
        </div>
    )
}
export default LoginElectron
