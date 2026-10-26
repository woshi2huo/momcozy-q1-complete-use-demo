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

页面使用 `assets/optimized/` 中的无损 WebP，`image-assets.js` 将原始文件名映射为带内容指纹的资源地址；原始高清素材保留在 `assets/hd/`。更新底图后，在项目根目录运行 `python3 demo/optimize-images.py`（需要 Pillow），重新生成两份 Demo 的资源，并更新 `index.html` 中 `image-assets.js` 的查询版本；如教学底图变化，还需同步 `styles.css` 中的视频背景地址及其查询版本。

当前页面优先加载，后续页面按操作路径逐张预加载；切换页面会清空尚未开始的旧预加载任务。隐藏的首页运行态图片在需要时加载。
