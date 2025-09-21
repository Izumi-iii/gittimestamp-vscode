# GitTimeStamp - Git提交时间戳插件

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![VSCode](https://img.shields.io/badge/VSCode-1.103.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一个强大的VSCode扩展，为Git提交消息自动添加时间戳，让您的提交历史更加清晰易读，提升团队协作效率。

[安装插件](#安装) • [使用指南](#使用指南) • [配置选项](#配置选项) • [开发文档](#开发)

</div>

## ✨ 功能特性

- 🕒 **智能时间戳**：自动为Git提交消息添加格式化的时间戳
- ⚡ **一键提交**：支持一键提交功能，可选择是否自动暂存所有文件
- 🎨 **高度自定义**：支持自定义时间戳格式和时区设置
- 🔧 **智能检测**：自动检测Git仓库状态和变更，避免无效操作
- 🌍 **跨平台支持**：完美支持Windows、macOS和Linux
- 🚀 **性能优化**：轻量级设计，不影响VSCode启动速度
- 🛡️ **安全可靠**：使用临时文件处理特殊字符，避免命令行注入

## 🚀 快速开始

### 安装插件

1. 打开VSCode扩展面板 (`Ctrl+Shift+X`)
2. 搜索 "GitTimeStamp"
3. 点击安装

### 基本使用

1. **预填充提交消息**：
   - 按 `Ctrl+Shift+P` 打开命令面板
   - 输入 "预填充提交消息"
   - 选择 "Git: 预填充提交消息"
   - Git面板中的输入框将自动填充时间戳消息

2. **一键提交**：
   - 按 `Ctrl+Shift+P` 打开命令面板
   - 输入 "一键提交"
   - 选择 "Git: 一键提交"
   - 插件将自动提交当前变更

## 📋 命令列表

| 命令 | 描述 | 快捷键 |
|------|------|--------|
| `Git: 预填充提交消息` | 在Git SCM输入框中预填充带时间戳的提交消息 | `Ctrl+Shift+P` |
| `Git: 一键提交` | 直接提交当前变更，可选择是否先暂存所有文件 | `Ctrl+Shift+P` |

## ⚙️ 配置选项

在VSCode设置中搜索 "Smart Commit" 来配置以下选项：

### `smartCommit.format`
- **类型**：`string`
- **默认值**：`[${user}] - ${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
- **描述**：提交消息格式模板
- **支持的变量**：
  - `${user}` - Git用户名（自动获取）
  - `${yyyy}` - 年份 (4位数字)
  - `${MM}` - 月份 (2位数字，01-12)
  - `${dd}` - 日期 (2位数字，01-31)
  - `${HH}` - 小时 (2位数字，00-23)
  - `${mm}` - 分钟 (2位数字，00-59)
  - `${ss}` - 秒数 (2位数字，00-59)

### `smartCommit.timezone`
- **类型**：`string`
- **默认值**：`local`
- **可选值**：`local` | `UTC`
- **描述**：时区设置
  - `local` - 使用本地时区
  - `UTC` - 使用协调世界时

### `smartCommit.stageAllBeforeCommit`
- **类型**：`boolean`
- **默认值**：`false`
- **描述**：提交前是否自动暂存所有文件
  - `true` - 自动执行 `git add .` 后再提交
  - `false` - 只提交已暂存的文件

## 📝 使用示例

### 默认格式
```
[张三] - 2024-01-15 14:30:25
```

### 自定义格式示例

| 格式模板 | 输出结果 | 说明 |
|----------|----------|------|
| `[${user}] ${yyyy}-${MM}-${dd} ${HH}:${mm}` | `[张三] 2024-01-15 14:30` | 简化时间格式 |
| `${yyyy}/${MM}/${dd} [${user}]` | `2024/01/15 [张三]` | 日期在前 |
| `${user} - ${yyyy}年${MM}月${dd}日 ${HH}:${mm}` | `张三 - 2024年01月15日 14:30` | 中文格式 |
| `[${user}] ${yyyy}${MM}${dd}_${HH}${mm}${ss}` | `[张三] 20240115_143025` | 紧凑格式 |

## 🛠️ 开发指南

### 本地开发环境

```bash
# 克隆仓库
git clone https://github.com/tkzzzzzz6/gittimestamp.git
cd gittimestamp

# 安装依赖
npm install

# 编译TypeScript
npm run compile

# 启动调试模式
# 在VSCode中按F5启动新的调试窗口
```

### 构建和发布

```bash
# 安装vsce工具
npm install -g vsce

# 打包扩展
vsce package

# 发布到市场（需要发布权限）
vsce publish
```

### 项目结构

```
gittimestamp/
├── src/
│   ├── extension.ts          # 主扩展文件
│   └── test/                 # 测试文件
├── package.json              # 扩展清单
├── tsconfig.json             # TypeScript配置
├── README.md                 # 说明文档
└── CHANGELOG.md              # 更新日志
```

## 🔧 系统要求

- **VSCode**：1.103.0 或更高版本
- **Node.js**：18+ (仅开发环境需要)
- **Git**：任意版本 (使用插件功能时必需)
- **操作系统**：Windows 10+, macOS 10.14+, Linux

## 📊 性能特性

- **轻量级**：插件大小 < 10KB
- **快速启动**：使用 `onStartupFinished` 激活，不影响VSCode启动速度
- **内存友好**：最小化内存占用
- **跨平台**：使用Node.js原生API，确保跨平台兼容性

## 🐛 故障排除

### 常见问题

**Q: 插件安装后看不到命令？**
A: 请确保：
1. 重启VSCode
2. 在Git仓库中打开项目
3. 确保有未提交的变更

**Q: 一键提交失败？**
A: 请检查：
1. 当前目录是否为Git仓库
2. 是否有未暂存的变更
3. Git配置是否正确

**Q: 时间戳格式不正确？**
A: 请检查：
1. 格式模板中的变量是否正确
2. 时区设置是否符合预期

### 调试模式

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Developer: Toggle Developer Tools"
3. 在Console标签页中查看详细日志

## 📈 更新日志

### v0.0.1 (2024-09-21)
- 🎉 初始版本发布
- ✨ 支持预填充提交消息功能
- ✨ 支持一键提交功能
- ✨ 支持自定义时间戳格式
- ✨ 支持时区设置
- ✨ 支持自动暂存选项
- 🛡️ 使用临时文件处理特殊字符
- 🌍 支持跨平台使用

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 使用TypeScript编写代码
- 遵循ESLint规则
- 添加适当的注释
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢VSCode团队提供的优秀扩展API
- 感谢所有贡献者和用户的支持
- 感谢开源社区的启发

## 📞 支持与反馈

- **问题报告**：[GitHub Issues](https://github.com/tkzzzzzz6/gittimestamp/issues)
- **功能建议**：[GitHub Discussions](https://github.com/tkzzzzzz6/gittimestamp/discussions)
- **邮箱**：tkzzzzzz6@noreply.gitcode.com

---

<div align="center">

**如果这个插件对您有帮助，请给我们一个 ⭐ Star！**

Made with ❤️ by [tkzzzzzz6](https://github.com/tkzzzzzz6)

</div>