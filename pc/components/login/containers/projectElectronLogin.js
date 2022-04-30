/**
 * @name: login
 * @author: mahai
 * @date: 2021-09-01 14:32
 * @description：子项目等登陆模块 （比如：知识库，项目管理的）
 * @update: 2021-09-01 14:32
 */
import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Image, Button} from 'antd';
import {getUser, disableFunction} from "doublekit-core-ui";

import Layout, {Header, Content, Footer} from '../../Layout'
import LocalLogin from "../components/localLogin";
import AccountLogin from "../components/accountLogin";
import LoginHeader from "../components/loginHeader/loginHeader";
import {useAccountConfig} from "../../hooks";
import {LOGIN_STATUS} from "../store";
import {parseSearch} from "../../utils";
import useAuthConfig from "../../hooks/useDingDingAuthCinfig";



const ProjectElectronLogin = props => {
    const {
        logoImg,
        logoName,
        contentImg,
        loginGoRouter,
        title = '',
        pickerData=[],
        languageSelectData = [], // 切换语言包的数据
        ...rest
    } = props;

    // 获取登录配置
    const authData = useAccountConfig();

    // 获取第三方登录的相关配置
    // 获取钉钉的
    const DingKeys = useAuthConfig('3');
    const wechatConfig = useAuthConfig('4');
    const [wechatUrl,setWechatUrl] = useState("")
    const [dingdingURL, setDingdingURL] = useState('');

    useEffect(() => {
        if (DingKeys) {
            const url = `${DingKeys.url}/connect/qrconnect?appid=${DingKeys.appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${DingKeys.redirectUri}`;
            setDingdingURL(url)
        }
    }, [DingKeys]);

    useEffect(() => {
        if (wechatConfig && wechatConfig.agentId && wechatConfig.url) {
            const url = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${wechatConfig.corpid}&agentid=${wechatConfig.agentId}&redirect_uri=${wechatConfig.url}&state=wechat`;
            setWechatUrl(url)
        }
    }, [wechatConfig])

    // 判断 是否有用户信息
    useEffect(() => {
        const user = getUser()
        if (user && user.ticket) {
            props.history.push('/')
        }
    }, []);

    // 钉钉扫码登录返回临时code处理
    useEffect(async () => {
        const DingDingUrl = window.location.href;
        const params = parseSearch(DingDingUrl)
        if(params.code && DingKeys) {
            await getDingDingCodeFindUser(params.code)
        }
    },[DingKeys]);
    const getDingDingCodeFindUser = async (code) => {
        const params = {
            code,
            appKey:DingKeys.appKey,
            appSecret:DingKeys.appSecret,
            url:DingKeys.url
        }
        await props.portalLoginStore.dingdingLogin(params);
        if (props.portalLoginStore.isLogin ) {
            if (props.loginGo) {
                window.location.href = window.location.origin + '/#/' + props.loginGo
            }
            window.location.href = window.location.origin
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

    return(
        <Layout>
            <Header>
                <LoginHeader
                    logoImg={logoImg}
                    logoName={logoName}
                    country={languageSelectData}
                    pickerData={pickerData}
                    portalLoginStore={rest.portalLoginStore}
                />
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
                                    src={contentImg}
                                    fallback="data:image/png;base64,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"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={'portal-login-content-wrap-row'}>
                                <div className={'portal-login-content-formWrap'}>
                                    {
                                        authData.authType === 'acc' && <AccountLogin
                                            loginGo={loginGoRouter}
                                            urlParams={authData}
                                            title={title}
                                            {...rest}
                                        />
                                    }
                                    {
                                        authData.authType === 'local' &&
                                        <LocalLogin
                                            title={title}
                                            loginGo={loginGoRouter}
                                            {...rest}
                                        />
                                    }
                                    <div className={'portal-login-content-action'}>
                                        <Button type="text" onClick={goDingLogin} disabled={disableFunction()} >钉钉</Button>
                                        <Button type="text" onClick={goWechat} disabled={disableFunction()}>企业微信</Button>
                                        <Button type="text">demo1</Button>
                                    </div>
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
export default inject(LOGIN_STATUS)(observer(ProjectElectronLogin))
