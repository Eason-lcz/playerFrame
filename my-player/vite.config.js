import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import electron from 'vite-plugin-electron'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 根据需要调整，确保路径正确
  build: {
    outDir: 'dist_electron', // 将构建输出到 dist_electron 文件夹，以避免与 Electron 的 dist 混淆
    emptyOutDir: true, // 清空输出目录
  },
  server: {
    port: 3000,
    open: false, // 不自动打开浏览器
    host: true, // 允许局域网访问
  },
  // define: {
  //   'process.env': {
  //   }, // 根据需要定义环境变量
  // },
  plugins: [vue(),
    electron({
      entry: 'electron.main.cjs',
    })],
})
