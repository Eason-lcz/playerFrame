// electron 主程序
const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')
const {join} = path

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
// 屏蔽安全警告
function createWindow() {
    const win = new BrowserWindow({
        // 窗口图标
        frame: false,
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: join(__dirname, 'preload.js')
        },
    })
    // 加载 Vue 应用
    // 开发环境：使用 Vite 开发服务器
    if (process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL) {
        const url = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
        win.loadURL(url);
        // 开启调试台
        win.webContents.openDevTools();
    } else {
        // 生产环境：加载打包后的文件
        win.loadFile(join(__dirname, 'dist/index.html'));
    }
    // 监听窗口控制事件
    ipcMain.on('window-minimize', () => {
        if (win && !win.isMinimized()) {
            win.minimize();
        }
    });

    ipcMain.on('window-close', () => {
        if (win) {
            win.close();
        }
    });

    // 发送窗口状态变化
    win.on('maximize', () => {
        win.webContents.send('window-state-changed', 'maximized');
    });

    win.on('unmaximize', () => {
        win.webContents.send('window-state-changed', 'unmaximized');
    });
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})