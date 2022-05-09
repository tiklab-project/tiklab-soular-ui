/**
 * @name: portalLogin
 * @author: mahai
 * @date: 2021-07-05 10:33
 * @description：账号中心登录页面
 * @update: 2021-07-05 10:33
 */
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {useTranslation} from "react-i18next";
import {Button, Dropdown, Menu, Row, Col, Image, Input, Form, message} from "antd";
import { removeUser, disableFunction} from 'doublekit-core-ui'

import Layout, {Header, Content, Footer} from '../../Layout'
import {scopedClassMaker, parseSearch, } from "../../utils";
import {LOGIN_STATUS} from "../store";

import useAuthConfig from "../../hooks/useDingDingAuthCinfig";
import '../components/loginHeader/loginHeader.scss';

const sc = scopedClassMaker('portal-login');

const FormItem = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Login = props => {
    const {
        className,
        logoImg='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1735300731,83723593&fm=26&gp=0.jpg',
        logoName,
        contentImg,
        loginGoRouter,
        staticContext,
        portalLoginStore,
        title = '',
        languageSelectData = [], // 切换语言包的数据
        ...rest
    } = props;

    const { t, i18n } = useTranslation();
    const [lan, setLan] = useState(i18n.language);
    const [dingdingURL, setDingdingURL] = useState('');
    const [wechatUrl,setWechatUrl] = useState("")
    const [form] = Form.useForm();
    // stores
    const {login,dingdingLogin} = portalLoginStore;

    const [loginType,setUseType] = useState("1");

    // custom Hooks
    // const country = useInitLanguageType({fetchMethod:fetchMethod, url:languageUrl});
    // url params

    // 获取第三方登录的相关配置
    // 获取钉钉的
    const DingKeys = useAuthConfig('3');

    const wechatConfig = useAuthConfig('4');
    const query = parseSearch(props.location.search);
    useLayoutEffect(() => {
        removeUser()
        // acc 模式下保存 redirect 用来钉钉企业微信扫码后处理跳转到对应的项目中
        if (query.redirect) {
            localStorage.setItem('redirect', query.redirect)
        }
    }, []);

    useEffect(() => {
        if (DingKeys) {
            const url = `${DingKeys.url}/connect/qrconnect?appid=${DingKeys.appKey}&response_type=code&scope=snsapi_login&state=dingDingScan&redirect_uri=${DingKeys.redirectUri}`;
            setDingdingURL(url)
        }
    }, [DingKeys]);

    useEffect(() => {
        if (wechatConfig && wechatConfig.agentId && wechatConfig.url) {
            const url = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${wechatConfig.corpid}&agentid=${wechatConfig.agentId}&redirect_uri=${wechatConfig.url}`;
            setWechatUrl(url)
        }
    }, [wechatConfig])

    // 钉钉扫码登录返回临时code处理
    useEffect(() => {
        const DingDingUrl = window.location.href;
        const params = parseSearch(DingDingUrl)
        if(params.code && DingKeys) {
            getDingDingCodeFindUser(params.code)
        }
    },[DingKeys]);

    const getDingDingCodeFindUser = (code) => {
        const params = {
            code,
            appKey:DingKeys.appKey,
            appSecret:DingKeys.appSecret,
            url:DingKeys.url
        }
        dingdingLogin(params);
        if (props.loginGo) {
            window.location.href = window.location.origin + '/#/' + props.loginGo
        }
        window.location.href = window.location.origin
    }

    const onClickLan = ({ key }) => {
        i18n.changeLanguage(languageSelectData[key].value)
        setLan(languageSelectData[key].value)
    };

    const LanguageMenu = (
        <Menu onClick={onClickLan}>
            {
                languageSelectData.map((item, index) => {
                    return <Menu.Item key={index} value={item.value}>{item.label}</Menu.Item>
                })
            }
        </Menu>
    );

    /**
     * 登录
     * @returns {*}
     * @constructor
     * @param values
     */
    const onLogin = async values => {
        let params = {
            account: values.account,
            password: values.password,
            userType:loginType
        }
        const res = await login(params);
        if (res.code) {
            return message.error(res.msg)
        } else {
            if (query.redirect) {
                const url = `${query.redirect}?email=${res.data.email}&name=${res.data.name}&expireTime=${res.data.expireTime}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`;
                window.location.href= url
            } else {
                if (props.loginGo) {
                    return props.history.push(props.loginGo)
                }
                return props.history.push('/')
            }
        }
    }


    const goDingLogin = () => {
        if (dingdingURL) {
            window.location.href = dingdingURL
        }
    }

    const goWechat = () => {
        if (wechatUrl) {
            window.location.href = wechatUrl
        }
    }

    const onLdap = () => {
      setUseType(loginType === "1" ? "2" : "1")
    }

    return (
        <Layout>
            <Header>
                <div className={sc('header', {extra: [className].join(' ')})}>
                    <div className={'portal-login-logo'}>
                        {logoImg && <div className={sc('image', {extra: [logoName].join(' ')})}><img src={logoImg} alt={'logo'} /></div> }
                    </div>
                    <div>
                        <Dropdown overlay={LanguageMenu} className={'portal-login-dropdown'}>
                            <Button>{lan}</Button>
                        </Dropdown>
                        {t('help')}
                    </div>
                </div>
            </Header>
            <Content>
                <div className={'portal-login-content'}>
                    <Row className={'portal-login-content-wrap'}>
                        <Col span={12}>
                            <div className={'portal-login-content-wrap-row'}>
                                <h2>{props.title}</h2>
                                <Image
                                    width={500}
                                    height={500}
                                    src={props.Img}
                                    fallback="data:image/png;base64,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"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={'portal-login-content-wrap-row'}>
                                <div className={'portal-login-content-formWrap'}>
                                    <h1 style={{textAlign: 'center', marginTop: '30px'}}>{t(loginType
                                        === "1" ?'loginForm.userLoginTitle' : "loginForm.userLoginLdapTitle")}</h1>

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
                                    {
                                        loginType === "1" ?
                                            <div className={'portal-login-content-action'}>
                                                <Button type="text" onClick={goDingLogin} disabled={disableFunction()}  >钉钉</Button>
                                                <Button type="text" onClick={goWechat} disabled={disableFunction()} >企业微信</Button>
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
export default inject(LOGIN_STATUS)(observer(Login))
