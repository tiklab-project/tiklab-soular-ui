/**
 * @name: VaildUserHOC
 * @author mahai
 * @date 2022/4/25 2:51 PM
 * @description VaildUserHOC
 */
import React, {Component} from "react";
import {getUser, LOCALSTORAGE_KEY, saveUser, urlQuery} from 'tiklab-core-ui'
import AccountApi from "../service/accountApi";

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
            const user = urlQuery(window.location.href);
            this.getProjectAuthentication().then(authData => {
                    // 门户中心返回数据
                  if (user.ticket) {
                        saveUser(user)
                        window.location.href = window.location.origin + '/' + window.location.hash
                  } else if (!getUser().ticket) {
                        if (authData.authType === 'acc') {
                            window.location.href = `${authData.authUrl}/#/logout?redirect=${window.location.origin}`
                        } else {
                            if (getUser().ticket) {
                                this.setState({
                                    loading: false
                                })
                            } else if (!user.code) {
                                history.push('/login')
                            }
                        }
                    } else {
                        this.setState({
                            loading: false
                        })
                  }
            })
        }

        getProjectAuthentication = async () => {
            const res = await AccountApi.authConfig()
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
            return this.state.loading ? "加载中" : <WrapComponent { ...this.props } authData={this.state.authData}/>
        }
    }

}

export default verifyUserHOC
