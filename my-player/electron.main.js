// electron 主程序
import path, { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow,Menu } from 'electron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'false'
// 屏蔽安全警告
function createWindow() {
    const win = new BrowserWindow({
        // 窗口图标
        icon: join(__dirname, 'resource/duihaojo.ico'),
        width: 1920,
        height: 1080,
        webPreferences: {
            // contextIsolation: false,
            // nodeIntegration: true,
            // preload: path.join(__dirname, 'preload.js')
        },
    })
    // Menu.setApplicationMenu(null);
    // 加载vue url视本地环境而定，如http://localhost:5173
    // win.loadURL('http://localhost:3000')
    // development模式
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        // 开启调试台
        win.webContents.openDevTools()
    }
    else {
        win.loadFile(join(__dirname, 'dist/index.html'))
    }
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