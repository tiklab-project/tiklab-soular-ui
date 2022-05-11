/**
 * @name: VaildUserHOC
 * @author mahai
 * @date 2022/4/25 2:51 PM
 * @description VaildUserHOC
 */
import React, {Component} from "react";
import {getUser, LOCALSTORAGE_KEY, saveUser, setCookie, urlQuery} from 'doublekit-core-ui'

import Api from "../login/api";
import {message} from "antd";

function verifyUserHOC (WrapComponent){
    return class wrapComponent extends Component {
        constructor(props){
            super(props)
            this.state={
                loading:true,
                authData: {}
            }
        }

        componentDidMount() {
            const {history} = this.props;
            const user = urlQuery(window.location.search || window.location.href);
            const redirect = localStorage.getItem('redirect');
            this.getProjectAuthentication().then(authData => {
                if (user.state === "wechat" || user.appid) {
                    // 企业微信扫码登录返回的数据
                    this.authWechatLogin(redirect)
                } else {
                    // 企业微信内部应用在企业微信客户端中的state都是  internal_wechat 字段,
                    if (user.code && user.state !== "internal_wechat") {
                        // 钉钉微信扫码登录返回的数据
                        this.authDingDingLogin(redirect)
                    }
                    // 门户中心返回数据
                    else if (user.ticket) {
                        saveUser(user)
                        this.setState({
                            loading: false
                        }, () =>{
                            window.location.href = window.location.origin + '/#' + history.location.pathname
                        })
                    } else if (!getUser().ticket) {
                        try {
                            if (electronVersion){
                                history.push('/logout')
                            }
                        } catch (e) {
                            if (authData.authUrl !== "null") {
                                location.href = `${authData.authUrl}/#/logout?redirect=${location.href}`
                            } else {
                                location.href = `${window.location.origin}/#/logout?redirect=${location.href}`
                            }
                        }
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                }
            })
        }

        getProjectAuthentication = async () => {
            const res = await Api.authConfig()
            if (!res.code) {
                try {
                    const authData = {...res.data, authUrl:acc_url}
                    localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify(authData))
                    this.setState({
                        authData:authData
                    })
                    return authData
                } catch (e) {
                    localStorage.setItem(LOCALSTORAGE_KEY.AUTH_CONFIG, JSON.stringify(res.data))
                    this.setState({
                        authData:res.data
                    })
                    return res.data
                }
            }

        }

        authWechatLogin(redirect) {
            const user = urlQuery(window.location.href);
            Api.getConfByRelDirectoryId('4').then(res => {
                if (!res.code){
                    const wechatCfg = res.data;
                    const params = {
                        code: user.code,
                        corpsecret: wechatCfg.corpsecret,
                        corpid: wechatCfg.corpid
                    }
                    Api.wechatLogin(params).then(res => {
                        if (res.code) {
                            window.location.href = window.location.origin + '/#/login'
                        } else {
                            setCookie('loginType',"wechatQR")
                            saveUser(res.data)
                            this.setState({
                                loading:false
                            })
                            if (redirect) {
                                localStorage.removeItem('redirect');
                               return  window.location.href= `${redirect}?email=${res.data.email}&name=${res.data.name}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
                            } else {
                                return window.location.href = window.location.origin + '/' + window.location.hash
                            }
                        }
                    })
                }
            })
        }

        authDingDingLogin(redirect){
            const {history } = this.props
            const user = urlQuery(window.location.href);
            // 钉钉
            Api.getConfByRelDirectoryId('3').then(res => {
                if (!res.code){
                    const params = {
                        code:user.code,
                        appKey:res.data.appKey,
                        appSecret:res.data.appSecret,
                        url:res.data.url
                    }
                    Api.dingDingLogin(params).then(res => {
                        if (res.code !== 0) {
                            const url = window.location.origin + '/#/login';
                            window.location.href = url
                        } else {
                            if (res.data) {
                                setCookie('loginType',"dingdingQR")
                                saveUser(res.data)
                                this.setState({
                                    loading:false
                                }, () => {
                                    if (redirect) {
                                        localStorage.removeItem('redirect');
                                        window.location.href= `${redirect}?email=${res.data.email}&name=${res.data.name}&ticket=${res.data.ticket}&phone=${res.data.phone}&userId=${res.data.userId}`
                                    } else {
                                        const url = window.location.origin + '/' + window.location.hash
                                        window.location.href = url
                                    }
                                })
                            } else {
                                message.error('没有同步到该钉钉用户')
                                history.push('/login')
                            }
                        }
                    })
                }
            })
        }

        render() {
            return this.state.loading ? "加载中" : <WrapComponent { ...this.props } authData={this.state.authData}/>
        }
    }

}

export default verifyUserHOC
