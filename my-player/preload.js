const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 窗口控制
    minimizeWindow: () => {
        try {
            ipcRenderer.send('window-minimize');
        } catch (error) {
            console.error('Failed to minimize window:', error);
        }
    },

    closeWindow: () => {
        try {
            ipcRenderer.send('window-close');
        } catch (error) {
            console.error('Failed to close window:', error);
        }
    },

    // 监听窗口状态变化
    onWindowStateChange: (callback) => {
        try {
            ipcRenderer.on('window-state-changed', (event, state) => {
                if (typeof callback === 'function') {
                    callback(state);
                }
            });
        } catch (error) {
            console.error('Failed to set up window state listener:', error);
        }
    },

    // 移除监听
    removeWindowStateListener: () => {
        try {
            ipcRenderer.removeAllListeners('window-state-changed');
        } catch (error) {
            console.error('Failed to remove window state listener:', error);
        }
    }
});