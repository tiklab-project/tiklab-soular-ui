/**
 * @name: accountLoginConiner
 * @author: mahai
 * @date: 2021-05-26 16:01
 * @description：账号中心登录
 * @update: 2021-05-26 16:01
 */
import React from 'react';
import {useTranslation} from "react-i18next";
import {Button, Input, Form,Checkbox, message} from 'antd';
import './login.scss'

const FormItem = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const AccountLogin = props => {
    const {urlParams, portalLoginStore, history} = props;

    const {login, user} = portalLoginStore
    const { t } = useTranslation();
    const [form] = Form.useForm();

    // TODO 登录方法
    const onAccountLogin = async (values) => {
        let params = {
            account: values.account,
            password: values.password,
            userType: props.loginType
        }
        const res =  await login(params)
        if(res.code) {
            return message.error(res.msg)
        } else  {
            try {
                if (electronVersion) {
                    history.push('/')
                }
            } catch (e) {
                window.location.href= `${urlParams.redirect}?email=${res.data.email}&name=${res.data.name}&expireTime=${res.data.expireTime}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
            }
        }
    };
    return (
        <>
            <div className={'portal-login-content-form'}>
                <Form
                    form={form}
                    name="horizontal_login"
                    {...layout}
                    onFinish={onAccountLogin}
                >
                    <FormItem
                        className={'portal-login-content-form-item'}
                        name="account"
                        rules={[
                            { required: true, message: t('loginForm.usernameRequired') },
                            ({ getFieldValue }) => ({
                                validator(rule, value, callback) {
                                    if (value) {
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
export default AccountLogin
