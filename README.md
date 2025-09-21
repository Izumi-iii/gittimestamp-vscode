# GitTimeStamp - Git提交时间戳插件

一个VSCode扩展，为Git提交消息自动添加时间戳，让您的提交历史更加清晰易读。

## 功能特性

- 🕒 **自动时间戳**：为Git提交消息自动添加格式化的时间戳
- ⚡ **一键提交**：支持一键提交功能，可选择是否自动暂存所有文件
- 🎨 **自定义格式**：支持自定义时间戳格式和时区设置
- 🔧 **智能检测**：自动检测Git仓库状态和变更
- 🌍 **跨平台**：支持Windows、macOS和Linux

## 命令

### 预填充提交消息
- **命令**：`Git: 预填充提交消息`
- **功能**：在Git SCM输入框中预填充带时间戳的提交消息
- **快捷键**：可通过命令面板 (Ctrl+Shift+P) 调用

### 一键提交
- **命令**：`Git: 一键提交`
- **功能**：直接提交当前变更，可选择是否先暂存所有文件
- **快捷键**：可通过命令面板 (Ctrl+Shift+P) 调用

## 配置选项

在VSCode设置中搜索 "Smart Commit" 来配置以下选项：

### `smartCommit.format`
- **类型**：字符串
- **默认值**：`[${user}] - ${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
- **描述**：提交消息格式模板
- **支持的变量**：
  - `${user}` - Git用户名
  - `${yyyy}` - 年份 (4位)
  - `${MM}` - 月份 (2位)
  - `${dd}` - 日期 (2位)
  - `${HH}` - 小时 (2位)
  - `${mm}` - 分钟 (2位)
  - `${ss}` - 秒数 (2位)

### `smartCommit.timezone`
- **类型**：字符串
- **默认值**：`local`
- **可选值**：`local` | `UTC`
- **描述**：时区设置

### `smartCommit.stageAllBeforeCommit`
- **类型**：布尔值
- **默认值**：`false`
- **描述**：提交前是否自动暂存所有文件

## 使用示例

### 默认格式
```
[张三] - 2024-01-15 14:30:25
```

### 自定义格式示例
- `[${user}] ${yyyy}-${MM}-${dd} ${HH}:${mm}` → `[张三] 2024-01-15 14:30`
- `${yyyy}/${MM}/${dd} [${user}]` → `2024/01/15 [张三]`

## 安装

1. 在VSCode中打开扩展面板 (Ctrl+Shift+X)
2. 搜索 "GitTimeStamp"
3. 点击安装

## 开发

### 本地开发
```bash
# 克隆仓库
git clone <repository-url>
cd tkzzzzzz6

# 安装依赖
npm install

# 编译
npm run compile

# 在VSCode中按F5启动调试
```

### 构建
```bash
# 安装vsce
npm install -g vsce

# 打包扩展
vsce package
```

## 系统要求

- VSCode 1.104.0 或更高版本
- Node.js 18+ (开发环境)
- Git (使用插件功能时)

## 更新日志

### 0.0.1
- 初始版本发布
- 支持基本的预填充和一键提交功能
- 支持自定义时间戳格式
- 支持时区设置

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 关键词

git, commit, timestamp, scm, 时间戳, 提交
