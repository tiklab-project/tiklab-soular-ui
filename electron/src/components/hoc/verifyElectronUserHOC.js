/**
 * @name: verifyElectronUserHOC
 * @author mahai
 * @date 2022/5/14 5:19 PM
 * @description verifyElectronUserHOC
 */
import React, {Component} from "react";
import {getUser, saveUser} from 'doublekit-core-ui'
import {message} from "antd";
import socket from '../util/socket'
const { ipcRenderer } = window.require('electron')

import Api from '../api';

function verifyElectronUserHOC(WrapComponent) {
    return class wrapComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading:true,
                sid:''
            }
        }

        componentDidMount(){
            Api.authConfig().then(res => {
                if (!res.code) {
                    // 根据socket 返回的sid 来作为用户id为acc登录做通信
                    if (getUser().ticket) {
                        this.setState({
                            loading:false
                        })
                    }else {
                        if (!socket.isConenet) {
                            let url
                            if (res.data.authType === "local") {
                                try {
                                    url = ws_url
                                } catch (e) {
                                    try {
                                        if (base_url.match(/https/)){
                                            url = base_url.replace("https", "wss")
                                        } else {
                                            url = base_url.replace("http", "ws")
                                        }
                                    } catch (e) {
                                        url = `ws://${window.location.host}`
                                    }
                                }
                            } else {
                                try {
                                    url = ws_url
                                } catch (e) {
                                    if (res.data.authUrl.match(/https/)){
                                        url = res.data.authUrl.replace("https", "wss")
                                    } else {
                                        url = res.data.authUrl.replace("http", "ws")
                                    }
                                }
                            }

                            socket.init(url);
                            socket.ws.onmessage = e => {
                                const data = JSON.parse(e.data);
                                if (data.sid) {
                                    this.setState({
                                        sid:data.sid
                                    })
                                }
                                if (data.type) {
                                    switch (data.type) {
                                        case 'login':
                                            const userInfo = JSON.parse(data.contents);
                                            saveUser(userInfo)
                                            ipcRenderer.send('closeAuthEvent')
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
        shouldComponentUpdate(nextProps, nextState, nextContext) {
            if (nextState.sid !== this.state.sid && nextState.sid) {
                Api.authConfig().then(authResponse => {
                    if (authResponse.code) {
                        return message.error(authResponse.msg)
                    } else {
                        try {
                            ipcRenderer.send('authEvent', {
                                url:acc_url + `/#/account?auth_device=app_native&device_id=${nextState.sid}`
                            })
                        } catch (e) {
                            ipcRenderer.send('authEvent', {
                                url:authResponse.authUrl + `/#/account?auth_device=app_native&device_id=${nextState.sid}`
                            })
                        }
                    }
                })
            }
            if (nextProps.loading !== this.state.loading) {
                return true
            }
        }

        componentWillUnmount() {
            ipcRenderer.removeAllListeners("authEvent")
            ipcRenderer.removeAllListeners("closeAuthEvent")
        }




        render() {
            return this.state.loading ? "加载中" : <WrapComponent { ...this.props }/>
        }
    }
}
export default verifyElectronUserHOC;
