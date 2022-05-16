/**
 * @name: socket
 * @author mahai
 * @date 2022/5/16 10:18 AM
 * @description socket
 */
import {message} from "antd";


class Socket {
    constructor() {
        this.ws = "" ;
        this.isConenet = false;
        this.sid = ""
    }
    init(url) {
        this.ws = new WebSocket(url + '/ws');
        this.isConenet = true
        console.log('websocket is conenet')
    }
    wsClose() {
        this.ws.onclose = () => {
           this.isConenet = false;
           console.log('websocket is close')
        };
    }
}

const socket = new Socket();
export default  socket
