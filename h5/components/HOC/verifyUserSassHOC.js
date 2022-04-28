/**
 * @name: verifyUserSassHOC
 * @author mahai
 * @date 2022/4/26 1:52 PM
 * @description verifyUserSassHOC
 */
import React, {Component} from "react";
import {getUser, LOCALSTORAGE_KEY, removeUser, saveUser, setCookie} from 'doublekit-core-ui'
import {Toast} from "antd-mobile";
import {parseSearch} from "../utils";
import AccountApi from "../service/accountApi";


function verifyUserSaasHOC(WrapComponent, wechatApplicationType) {
    return class wrapComponent extends Component {
        constructor(props){
            super(props)
            this.state={
                loading:true,
            }
        }

        componentDidMount() {
            const {login } = this.props.portalLoginStore;
            const query = parseSearch(window.location.search);
            this.getProjectAuthentication(query.tenant).then(authData => {
                if (query.ticket) {
                    if (wechatApplicationType) {
                        setCookie("applicationType", wechatApplicationType)
                    }
                    saveUser(query)
                    login(query);
                    this.setState({
                        loading: false
                    }, () => {
                        location.href = location.origin + '/' + location.hash
                    })
                } else {
                    if (authData.authUrl) {
                        if(!getUser().ticket) {
                            removeUser()
                            location.href = `${authData.authUrl}/#/logout?redirect=${location.href}`
                        } else {
                            this.setState({
                                loading: false
                            })
                        }
                    } else {
                        return Toast.show({
                            icon: 'fail',
                            content: '名称已存在',
                        })
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
            const res = await AccountApi.authConfig(axiosHeader)
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
