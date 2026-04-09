# 项目目录结构
    my-player/
    ├── node_modules/          # 项目依赖模块目录
    ├── src/
    │    ├── assets/    # 渲染进程文件
    │    │   └── img/
    │    ├── components/    # 组件目录
    │    │   ├── common/    # 通用组件目录
    │    │   └── layouts/    # 布局组件目录
    │    ├── utils/    # 工具函数目录
    │    │   └── eventBus.js    # 事件总线工具函数文件
    │    ├── style.css    # 样式文件
    │    ├── main.js    # 主进程文件
    │    └── App.vue    # 应用入口文件
    ├── public/          # 静态资源目录（如图标、字体等）
    ├── index.html       # 渲染进程入口文件
    ├── electron.main.cjs          # 主进程
    ├── preload.js       # 预加载脚本（必须在根目录或正确路径）
    ├── vite.config.js
    ├── package.json
    └── README.md