/**
 * @name: login
 * @author: mahai
 * @date: 2021-09-01 14:32
 * @description：子项目等登陆模块 （比如：知识库，项目管理的）
 * @update: 2021-09-01 14:32
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Button, Form, Input, message} from 'antd';
import {saveUser, setCookie} from 'doublekit-core-ui'
import Layout, {Header, Content, Footer} from '../../Layout'
import {LOGIN_STATUS} from "../store";
import {useTranslation} from "react-i18next";
import api from "../api";


const layout = {
    wrapperCol: { span: 24},
};
const ProjectElectronSassLogin = props => {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [loginType,setUseType] = useState("1");

    const onLdap = () => {
        setUseType(loginType === "1" ? "2" : "1")
    }

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
        switch (user.code) {
            case 2000:
                break;
            case 2001:
                break;
            case 0:
                saveUser({...user.data, isRam: '1'})
                setCookie("tenant", values.tenant)
                props.history.push({
                    pathname:'/'
                })
                break;
            default:
                return message.error(user.msg)
        }
    }

    return(
        <Layout>
            <Content>
                <div className={'portal-login-content'}>
                    <Row className={'portal-login-content-wrap'}>
                        <Col span={24}>
                            <div className={'portal-login-content-wrap-row'}>
                                <div className={'portal-login-content-formWrap'}>
                                    <h1 style={{textAlign: 'center', marginTop: '30px'}}>{t(loginType
                                    === "1" ?'loginForm.userLoginTitle' : "loginForm.userLoginLdapTitle")}</h1>
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
                                            <div className={'portal-login-content-action'}>
                                                <Button type="text" onClick={onLdap}>
                                                    Ldap
                                                </Button>
                                            </div>
                                            :
                                            <div className={'portal-login-content-action'}>
                                                <Button type="text" onClick={onLdap}>
                                                    返回
                                                </Button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer>DARTHCLOUD</Footer>
        </Layout>
    )
}
export default inject(LOGIN_STATUS)(observer(ProjectElectronSassLogin))
