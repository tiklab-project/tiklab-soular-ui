/**
 * @name: verifyElectronUserHOC
 * @author mahai
 * @date 2022/5/14 5:19 PM
 * @description verifyElectronUserHOC
 */
import React, {Component} from "react";
import {message} from "antd";
const { ipcRenderer } = window.require('electron')

import Api from '../api';

function verifyElectronUserHOC(WrapComponent) {
    return class wrapComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading:true,
            }
        }

        componentDidMount(){
            const {socketStore} = this.props;
            if (socketStore) {
                const { isConnect, initSocket } = socketStore;
                if (!isConnect) {
                    initSocket()
                }
            }
            this.setState({
                loading:false
            })
        }
        // componentDidUpdate(prevProps, prevState, snapshot) {
        //     const {socketStore} = prevProps
        //     if (!socketStore) return
        //     const { sid } = socketStore;
        //     if (sid !== this.props.socketStore.sid && sid) {
        //         Api.authConfig().then(authResponse => {
        //             if (authResponse.code) {
        //                 return message.error(authResponse.msg)
        //             } else {
        //                 try {
        //                     ipcRenderer.send('authEvent', {
        //                         url:acc_url + `/#/account?auth_device=app_native&device_id=${sid}`
        //                     })
        //                 } catch (e) {
        //                     ipcRenderer.send('authEvent', {
        //                         url:authResponse.authUrl + `/#/account?auth_device=app_native&device_id=${sid}`
        //                     })
        //                 }
        //             }
        //         })
        //     }
        // }

        // componentWillUnmount() {
        //     ipcRenderer.removeAllListeners("authEvent")
        //     ipcRenderer.removeAllListeners("closeAuthEvent")
        // }




        render() {
            return this.state.loading ? "加载中" : <WrapComponent { ...this.props }/>
        }
    }
}
export default verifyElectronUserHOC;
