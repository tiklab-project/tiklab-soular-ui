/**
 * @name: verifyUserSassHOC
 * @author mahai
 * @date 2022/4/26 1:52 PM
 * @description verifyUserSassHOC
 */
import React, {Component} from "react";
import {message} from "antd";
import {getUser, LOCALSTORAGE_KEY, removeUser, saveUser, setCookie, urlQuery} from 'doublekit-core-ui'
import Api from "../login/api";

/**
 *
 * @param WrapComponent
 * @param wechatApplicationType: portal、project、apibox、、
 */
function verifyUserSaasHOC(WrapComponent, wechatApplicationType) {
    return class wrapComponent extends Component {
        constructor(props){
            super(props)
            this.state={
                loading:true,
            }
        }

        componentDidMount() {
            const query = urlQuery(window.location.search || window.location.href);
            this.getProjectAuthentication(query.tenant).then(authData => {
                if (query.ticket) {
                    if (wechatApplicationType) {
                        setCookie("applicationType", wechatApplicationType)
                    }
                    saveUser(query)
                    this.setState({
                        loading: false
                    }, () => {
                        try {
                            if (electronVersion) {
                                this.props.history.push('/')
                            }
                        }catch (e) {
                            window.location.href = location.origin + '/' + location.hash
                        }
                    })
                } else {
                    if (authData.authUrl) {
                        if(!getUser().ticket) {
                            removeUser()
                            try {
                                if (electronVersion) {
                                    this.props.history.push('/login')
                                }
                            }catch (e) {
                                location.href = `${authData.authUrl}/#/logout?redirect=${location.href}`
                            }
                        } else {
                            this.setState({
                                loading: false
                            })
                        }
                    } else {
                        return message.error('没有配置账号中心')
                    }
                }
            })
        }


        getProjectAuthentication = async (tenant) => {
            let axiosHeader = {}
            if (tenant) {
                axiosHeader = {
                    tenant: tenant
                }
            }
            const res = await Api.authConfig(axiosHeader)
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

        render() {
            return this.state.loading ? "加载中" : <WrapComponent { ...this.props }/>
        }
    }
}

export default verifyUserSaasHOC;
