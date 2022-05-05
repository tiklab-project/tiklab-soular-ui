/**
 * @name: login
 * @author: mahai
 * @date: 2021-05-24 10:52
 * @description：login
 * @update: 2021-05-24 10:52
 */
import React, {useState, useEffect} from 'react';
import { Space, Avatar, Button, Form, Input, Checkbox } from 'antd-mobile';
import {urlQuery} from 'doublekit-core-h5'

import {inject, observer} from "mobx-react";
import {LOGIN_STATUS} from "../store";
import styles from './styles/login.module.scss';
const url =  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9';

const Login  = props => {

    const {location, portalLoginStore, isSass = false} = props;
    const { login } = portalLoginStore;


    const query = urlQuery(location.search);
    const [form] = Form.useForm();
    const [userType,setUserType] = useState('1');

    useEffect(() => {
        window.receiveMessage = (msg) => {
            alert( msg)
        }
    }, []);

    const onLogin =  async (values) => {
        const res = await login({...values, userType});
        if (!res.code) {
            if (query.redirect) {
                if (values.tenant) {
                    const hrefUrl = `${query.redirect}?phone=${res.data.phone}&email=${res.data.email}&name=${res.data.name}&userId=${res.data.userId}&ticket=${res.data.ticket}&tenant=${values.tenant}`;
                    window.location.href = hrefUrl
                } else {
                    const hrefUrl = `${query.redirect}?phone=${res.data.phone}&email=${res.data.email}&name=${res.data.name}&userId=${res.data.userId}&ticket=${res.data.ticket}`;
                    window.location.href = hrefUrl
                }

            } else {
                // react native 处理 网页向rn发送的消息
                window.ReactNativeWebView.postMessage(JSON.stringify({user: res.data}));
                // history.push('/')
            }
        }
    }

    return (
        <div className={styles.login}>
            <Space justify='center' block>
                <Avatar src={url} style={{ '--size': '64px' }} />
            </Space>
            <Form
                form={form}
                layout='horizontal'
                mode='card'
                onFinish={onLogin}
                footer={
                    <div>
                        <Space direction='vertical' justify='start' block>
                            <Checkbox >LDAP</Checkbox>
                            <Button block type='submit' color='primary' size='large'>
                                提交
                            </Button>
                        </Space>
                    </div>
                }
            >
                {
                    isSass &&
                    <Form.Item label='租户' name='tenant'>
                        <Input placeholder='租户' />
                    </Form.Item>
                }

                <Form.Item label='账号' name='account'>
                    <Input placeholder='支持邮箱、用户名、手机号' />
                </Form.Item>
                <Form.Item label='密码' name='password'>
                    <Input placeholder='请输入密码' type='password'/>
                </Form.Item>
            </Form>
        </div>


    )
}
export default inject(LOGIN_STATUS)(observer(Login))
