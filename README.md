# IberiaEye 伊比利亚之眼

明日方舟速通云控后端的前端

本项目基于 Vue3 + Vite + Tailwind 开发，自适应设备，剩下的慢慢编

## Usage 食用方式

### 调试

在执行命令前，你首先需要在项目根目录创建 `.env.local` 文件，写入并修改以下内容
```
VITE_NODE_ENV=local
VITE_API_URL=http://yourdomain.com/
```
修改`VITE_API_URL`为云控后端的地址，然后便可执行命令启动调试服务器
```
$ npm install
$ npm run dev
```

> 在浏览器中访问 http://localhost:3000 即可

### 部署
同样，你需要修改`.env.production`文件中的后端地址为实际真实地址，特别提醒：如果你将使用 https 协议访问平台，后端地址**必须支持** https 协议访问

~~详见 [怎么还没更新](https://github.com/AegirTech/Inquisition/blob/main/doc/FastDeploy.md#inquisition安装)~~

或许你需要百度如何通过反向代理为后端服务绑定域名并且添加证书
```
$ npm install
$ npm run build
```

然后将`dist`文件夹内容放到 Web 根目录即可访问

> 注：你需要修改 Web 服务器的伪静态配置，指路[官方参考文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#服务器配置示例)。
>
> ~~如果你正在通过 `vercel` 部署本项目，恭喜你，你可以直接导入仓库部署，不需要修改任何配置~~错误的，你仍需要修改后端地址。

## Other 一些碎碎念

好忙啊