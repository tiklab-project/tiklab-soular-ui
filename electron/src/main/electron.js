
const path = require('path')
const { app, BrowserWindow, ipcMain, shell } = require('electron')

const {queryUrl} = require('./utils')

const isDev = process.env.NODE_ENV === 'development';
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let win

function createWindow() {
    win = new BrowserWindow({
        width: 380,
        height: 540,
        frame: true,
        useContentSize: true,
        resizable: false,//禁止改变主窗口尺寸
        maximizable: false,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            webSecurity:false,
            // preload: path.join(__dirname, 'preload.js')
        }
    })

    if (!isDev) {
        console.log("url----------------------------------10.16")
        win.loadURL(`http://localhost:3001`)
        // win.webContents.openDevTools()
    } else {
        win.loadURL(`file://${path.join(__dirname, '../build/app/index.html')}`)
    }
    win.on('close', () => {
        win = null
    })

    win.webContents.openDevTools()
}

ipcMain.on('message', (_, message) => {
    console.log(message)
})
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    // 回复消息
    event.reply('asynchronous-reply', 'pong')
})

// 监听synchronous-message，接收渲染进程发送的消息
ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    // 返回的值
    event.returnValue = 'pong'
})

//接收渲染进程的信息
ipcMain.on("min", function () {
    win.minimize();
});
ipcMain.on("max", function () {
    win.maximize();
});
ipcMain.on("login-window", function (ipcMainEvent, data) {
    const loginWindow = new BrowserWindow({
        width: 750,
        height: 450,
        minimizable: false,
        maximizable: false
    });
    loginWindow.setMenu(null);

    loginWindow.loadURL(data.url);

    loginWindow.webContents.openDevTools()

    loginWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    const content = loginWindow.webContents;


    ipcMainEvent.reply('navigate-in-page', 'pongpong')


    content.on('did-navigate', (e, url) => {
        console.log('did-navigate-url--:',url)
        const params = queryUrl(url);
        if (params.state && params.state === "dingDingScan" && !params.redirect_uri) {
            ipcMainEvent.reply('thirdLoginParams',params)
            loginWindow.close()
        }
        if (params.state && params.state === "wechatScan" && !params.redirect_uri) {
            ipcMainEvent.reply('thirdLoginParams',params)
            loginWindow.close()
        }
    })


    content.on('did-navigate-in-page', (e, url) => {
        console.log('did-navigate-in-page-url--:',url)
        ipcMainEvent.reply('navigate-in-page',url)
        loginWindow.close()
    })


});

ipcMain.on("main-window", function () {
    // win.setSize(400, 300);
    win.setSize(1440, 760)
    win.setMinimumSize(1200, 760)
    win.setResizable(true)
    win.setMaximizable(true)
    // win.resizable = true
    // win.maximizable = true
    win.center()
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    // createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

