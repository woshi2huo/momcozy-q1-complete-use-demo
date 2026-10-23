# Momcozy Q1 手机版 Demo

从 `demo/q1-complete-use/` 复制的独立静态版本，只呈现手机交互画面，不包含目录、顶部工具栏和流程状态面板。资源和代码均在此目录内，原版与手机版各自保存使用状态。

在项目根目录运行 `npm run dev`，打开：

http://127.0.0.1:4173/demo/q1-mobile/

默认从设备发现与连接流程开始，后续通过画面中的按钮继续教学、子首页、计划、控制和吸乳记录流程。

可直接访问的页面：

- `#my-devices`：我的设备
- `#home`：已有计划子首页
- `#control`：Standard mode 控制页
- `#control-program`：Milk Collection Mode P1 控制页

无需构建或安装依赖。上传整个 `q1-mobile` 目录到静态网站即可使用，所有资源使用相对路径。当前仓库的 GitHub Pages 地址为：

https://woshi2huo.github.io/momcozy-q1-complete-use-demo/demo/q1-mobile/

GitHub Pages 从 `main` 分支根目录发布，此目录推送后会随站点更新。该地址在发布成功后才可访问。
