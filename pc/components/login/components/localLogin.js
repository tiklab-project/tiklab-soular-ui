/**
 * @name: localLogin
 * @author: mahai
 * @date: 2021-05-26 16:05
 * @description：本地系统登录
 * @update: 2021-05-26 16:05
 */


import React from 'react';
import {useTranslation} from "react-i18next";
import {Axios} from "doublekit-core-ui";
import {Button, Input, Form, message, Radio, Checkbox} from 'antd';
import {phoneReg, emailReg} from '../../utils';
import './login.scss';

const FormItem = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const LocalLogin =  props => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const onLogin = async values => {
        let params = {
            account: values.account,
            password: values.password,
            userType: props.loginType
        }
        const res = await props.portalLoginStore.login(params)
        if(res.code) {
            return message.error(res.msg)
        } else  {
            if (props.loginGo) {
                return props.history.push(props.loginGo)
            }
            return props.history.push('/')
        }
    }

    return (
        <>
            <div className={'portal-login-content-form'}>
                <Form
                    form={form}
                    name="horizontal_login"
                    {...layout}
                    onFinish={onLogin}
                >
                    <FormItem
                        className={'portal-login-content-form-item'}
                        name="account"
                        rules={[
                            { required: true, message: t('loginForm.usernameRequired') },

                            ({ getFieldValue }) => ({
                                validator(rule, value,callback) {
                                    if(value) {
                                        // const vaild = phoneReg.test(value) || emailReg.test(value)
                                        if (value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(t('loginForm.usernameCustomRequired'));
                                    }
                                    callback()
                                },
                            }),
                        ]}

                    >
                        <Input placeholder={t('loginForm.usernamePlaceholder')} />
                    </FormItem>
                    <FormItem
                        className={'portal-login-content-form-item'}
                        name="password"
                        rules={[{ required: true, message: t('loginForm.passwordRequired') }]}
                    >
                        <Input
                            type="password"
                            placeholder={t('loginForm.passwordPlaceholder')}
                        />
                    </FormItem>
                    <FormItem shouldUpdate={true} className={'portal-login-content-form-item'}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width:'100%'}}
                            >
                                {t('loginForm.LoginBtn')}
                            </Button>
                        )}
                    </FormItem>
                </Form>
            </div>
        </>
    )
}

export default LocalLogin
