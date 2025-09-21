# Change Log

All notable changes to the "GitTimeStamp" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2024-09-21

### Added
- 🎉 初始版本发布
- ✨ 支持预填充提交消息功能
- ✨ 支持一键提交功能
- ✨ 支持自定义时间戳格式模板
- ✨ 支持时区设置 (local/UTC)
- ✨ 支持自动暂存选项
- 🛡️ 使用临时文件处理特殊字符，避免命令行注入
- 🌍 支持跨平台使用 (Windows/macOS/Linux)
- 📝 完整的README文档和使用指南
- 🔧 智能Git仓库检测和变更检测
- ⚙️ 丰富的配置选项

### Technical Details
- 使用VSCode Git API v1进行集成
- 使用execFile确保安全性
- 支持TypeScript严格模式
- 完整的错误处理和用户友好的提示信息