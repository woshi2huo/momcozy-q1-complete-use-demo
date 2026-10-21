# Momcozy Q1 Complete Use Demo

独立的 Q1 吸奶器完整使用代码 Demo。整体外壳和交互方式参考 V4 本地代码 Demo，Q1 画面与流程来自 Figma `Q1接入Momcozy / V1.2版本 / Q1完整使用Demo`。

## 启动

```bash
npm run dev
```

访问：`http://127.0.0.1:4173/demo/q1-complete-use/`

## 已覆盖流程

- 左侧固定“设备连接流程”入口，可随时重置到未绑定首页，并分别启动自动发现或手动添加路径
- 未绑定设备首页自动发现 Q1：Connect → Connecting → Done
- 手动添加 Q1：Add Device → 扫描 → 连接确认 → 33% Connecting → 完成
- 自动发现完成进入无数据、无计划的 Q1 初始子首页，手动配网完成进入设备控制
- 新增从 V4 Demo 复制的设备教学四页流程：欢迎页、教学详情、教学最后一页和完成页
- 子首页 Pumping Trend 进入周期趋势与历史记录详情
- Log Pumping Amount 调整左右侧奶量和时长，保存后进入 Logged 成功页与已记录子首页
- AI Lactation Plan：介绍 → 基础信息 → 生成中 → 时段确认 → 已有计划子首页
- 初始、已记录、已有计划三种子首页状态均可进入 Q1 设备控制
- 设备控制页的模式、档位、频率和灯光使用统一的原生选中状态，不再叠加截图旧状态
- 设备空闲时遮住底图旧计时，Program 运行时同步显示 Program 名称并取消手动韵律选中
- Start Pumping 进入吸乳中状态，支持计时、暂停、Hold to Finish、补充左右侧奶量和 Logged 完成反馈
- Switch 进入韵律列表
- 查看 Program 详情、创建和保存 Program，并按 V1.2 完成创建韵律、Rest、分段复制/删除和 Mode Selection 流程
- 设备设置、固件升级确认和升级过程
- 吸乳完成并保存记录后返回更新后的 Q1 子首页

V4 参考工程仅用于代码结构和交互模式参考，本项目不会修改 V4 源码或线上 Demo。
