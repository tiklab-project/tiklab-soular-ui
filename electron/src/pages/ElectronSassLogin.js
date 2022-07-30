/**
 * @name: login
 * @author: mahai
 * @date: 2021-09-01 14:32
 * @description：子项目等登陆模块 （比如：知识库，项目管理的）
 * @update: 2021-09-01 14:32
 */
import React, { useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Button, Form, Input, message, Layout, notification} from 'antd';
import {saveUser, setCookie} from 'doublekit-core-ui'
import {EAM_STORE} from "../store";
import {useTranslation} from "react-i18next";
import api from "../api";
import './login.scss'

const { Content, Footer } = Layout;

const layout = {
    wrapperCol: { span: 24},
};
const ElectronSassLogin = props => {

    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [loginType,setUseType] = useState("1");

    const onLdap = () => {
        setUseType(loginType === "1" ? "2" : "1")
    }
    const [loginError,setLoginError] = useState('')

    const Login = async (values) => {

        const fromData = {
            password: values.password,
            account: values.email,
            userType:loginType
        }
        const user = loginType === "1" ? await api.localLogin(
            fromData,
            {
                tenant:values.tenant
            }
        ) :  await api.ldapLogin(
            fromData,
            {
                tenant:values.tenant
            }
        )
        if (user.code === 0) {
            setLoginError('')
            saveUser({...user.data, isRam: '1'})
            setCookie("tenant", values.tenant)
            props.history.push({
                pathname:'/'
            })
        } else {
            switch (res.code) {
                case 50000:
                    setLoginError(t('loginError.accountError'));
                    break;
                default:
                    setLoginError(res.msg);
                    break
            }
        }
    }
    const goWechat = () => {
        const encode = 'http%3A%2F%2Fportal.dev.doublekit.net';
        const url = `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=ww29642f6060791291&redirect_uri=${encode}&state=portal_wechat_scan&usertype=member`
        if (props.electronWeChatQR) {
            props.electronWeChatQR(url)
        } else {
            return message.error('doublekit-electron-ui 中 LoginSassPage 没有electronWeChatQR 方法')
        }

    }
    return(
        <Layout>
            <Content>
                <div className={'eam-login-content'}>
                    <div className={'eam-login-content-wrap-row'}>
                        <div className={'eam-login-content-formWrap'}>
                            <h1 style={{textAlign: 'center', marginTop: '30px'}}>{t(loginType
                            === "1" ?'loginForm.userLoginTitle' : "loginForm.userLoginLdapTitle")}</h1>

                            {
                                loginError && <p className='eam-login-error'>
                                        <span >
                                            {loginError}
                                        </span>
                                </p>
                            }

                            <Form
                                {...layout}
                                form={form}
                                onFinish={Login}
                            >
                                <Form.Item
                                    name="tenant"
                                    rules={[{ required: false, message: '输入租户id!' }]}
                                >
                                    <Input placeholder='输入租户id'/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: '手机号或者邮箱必填' },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value,callback) {
                                                if(value) {
                                                    // const vaild = phoneReg.test(value) || emailReg.test(value)
                                                    if (value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('请输入手机号码、邮箱或用户名');
                                                }
                                                callback()
                                            },
                                        }),
                                    ]}

                                >
                                    <Input placeholder='输入邮箱或手机号' />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '输入密码!' }]}
                                >
                                    <Input placeholder='输入密码' type='password'/>
                                </Form.Item>
                                <div>
                                    <Button
                                        htmlType="submit"
                                        type='primary'
                                        className="w-full"
                                    >
                                        登录
                                    </Button>
                                </div>
                            </Form>
                            {
                                loginType === "1" ?
                                    <div className={'eam-login-content-action'}>
                                        <Button type="text" onClick={onLdap}>
                                            Ldap
                                        </Button>
                                        <Button type="text" onClick={goWechat}>
                                            <img
                                                src="https://open.work.weixin.qq.com/service/img?id=ww29642f6060791291&t=login&c=blue&s=large"
                                                referrerPolicy="unsafe-url" alt="企业微信"/>
                                        </Button>

                                    </div>
                                    :
                                    <div className={'eam-login-content-action'}>
                                        <Button type="text" onClick={onLdap}>
                                            账号登录
                                        </Button>
                                        <Button type="text" onClick={goWechat}>
                                            <img
                                                src="https://open.work.weixin.qq.com/service/img?id=ww29642f6060791291&t=login&c=blue&s=large"
                                                referrerPolicy="unsafe-url" alt="企业微信"/>
                                        </Button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Content>
            <Footer>DARTHCLOUD</Footer>
        </Layout>
    )
}
export default inject(EAM_STORE)(observer(ElectronSassLogin))
