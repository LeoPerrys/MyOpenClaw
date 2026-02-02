---
name: claude-code
description: Claude Code CLI 助手。用于安装、配置和使用 Claude Code (Anthropic 的 AI 编程助手)。使用场景包括：安装 Claude Code、配置认证、基本使用（编辑文件、运行命令、Git 集成）、与其他工具集成（VS Code、JetBrains、GitHub Actions、Slack 等）、MCP (Model Context Protocol) 集成、故障排除。
---

# Claude Code CLI 助手

Claude Code 是 Anthropic 官方的 AI 编程助手，可以直接在终端中编辑代码、运行命令、自动化开发任务。

## 快速开始

### 安装 Claude Code

**macOS/Linux/WSL (推荐):**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**macOS (Homebrew):**
```bash
brew install --cask claude-code
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows WinGet:**
```cmd
winget install Anthropic.ClaudeCode
```

### 首次使用

```bash
cd your-project
claude
```

首次运行会提示你登录 Claude 账号。

## 核心功能

### 1. 从描述构建功能

用自然语言描述你想要的功能，Claude Code 会：
- 制定实现计划
- 编写代码
- 确保代码工作正常

示例：
```bash
claude "添加一个用户认证功能，使用 JWT 和 bcrypt"
```

### 2. 调试和修复问题

描述 bug 或粘贴错误消息，Claude Code 会：
- 分析代码库
- 识别问题
- 实现修复

示例：
```bash
claude "修复登录时的 500 错误"
```

### 3. 导航代码库

询问任何关于代码库的问题，Claude Code 会：
- 维护对整个项目结构的理解
- 从网络获取最新信息
- 通过 MCP 从外部数据源获取信息

示例：
```bash
claude "这个项目中如何处理用户权限？"
```

### 4. 自动化繁琐任务

- 修复 lint 问题
- 解决合并冲突
- 编写发布说明
- 在 CI/CD 中自动运行

示例：
```bash
claude "修复所有的 ESLint 错误"
```

## 高级用法

### 管道和组合

Claude Code 遵循 Unix 哲学，可以与其他命令组合：

**监控日志并发送告警：**
```bash
tail -f app.log | claude -p "如果日志中出现异常，发送 Slack 通知"
```

**CI/CD 自动化：**
```bash
claude -p "如果有新的文本字符串，翻译成法语并创建 PR 给 @lang-fr-team 审查"
```

### 与其他工具集成

**VS Code:** 参见 [VS Code 集成文档](references/vs-code.md)
**JetBrains IDEs:** 参见 [JetBrains 集成文档](references/jetbrains.md)
**GitHub Actions:** 参见 [GitHub Actions 集成文档](references/github-actions.md)
**GitLab CI/CD:** 参见 [GitLab CI/CD 集成文档](references/gitlab-ci.md)
**Slack:** 参见 [Slack 集成文档](references/slack.md)
**Web 版:** https://claude.ai/code

## MCP (Model Context Protocol)

MCP 允许 Claude Code 从外部数据源获取信息：
- Google Drive（设计文档）
- Figma（设计文件）
- Slack（团队沟通）
- Jira（任务管理）
- 自定义开发工具

详细说明参见 [references/mcp.md](references/mcp.md)

## 常用命令

### 基本命令

```bash
# 启动交互式会话
claude

# 处理提示词（非交互式）
claude -p "your prompt here"

# 从管道读取输入
echo "bug description" | claude

# 编辑特定文件
claude app.js
```

### Git 集成

Claude Code 会自动创建 commits，但也可以手动控制：

```bash
# 让 Claude 创建 commit
claude "创建一个 commit，消息为 '修复登录 bug'"

# 查看 Claude 的更改
git diff
```

## 安全和合规

- **企业级安全**: 内置企业级安全、隐私和合规性
- **数据使用**: 参见 [隐私政策](https://docs.anthropic.com/en/docs/claude-code/data-usage)
- **安全最佳实践**: 参见 [安全文档](references/security.md)

## 故障排除

### 常见问题

**1. 认证失败**
```bash
# 重新认证
claude --auth
```

**2. 项目索引问题**
```bash
# 重建索引
claude --reindex
```

**3. 网络问题**
```bash
# 检查连接
claude --health-check
```

更多故障排除参见 [references/troubleshooting.md](references/troubleshooting.md)

## 前提条件

- Claude 订阅（Pro、Max、Teams 或 Enterprise）或
- [Claude Console](https://console.anthropic.com/) 账号
- 终端访问权限
- Node.js 18+ 或 Python 3.8+（某些功能需要）

## 工作流程示例

### 场景 1: 添加新功能

```bash
# 1. 进入项目目录
cd my-project

# 2. 启动 Claude Code
claude

# 3. 描述需求
> 添加一个用户评论功能，包括：
> - 创建、读取、更新、删除评论
> - 使用 React + TypeScript
> - 集成到现有的 API

# 4. Claude 会：
# - 分析现有代码结构
# - 制定实现计划
# - 编写代码
# - 运行测试
```

### 场景 2: 修复 Bug

```bash
# 1. 复制错误消息
# 2. 运行 Claude
echo "[ERROR] TypeError: Cannot read property 'user' of undefined" | claude

# Claude 会：
# - 分析错误
# - 定位问题代码
# - 实现修复
# - 创建 commit
```

### 场景 3: 重构代码

```bash
claude "重构 components/Header.tsx，使其更易维护"
```

## 最佳实践

1. **明确的需求**: 用清晰、具体的自然语言描述你想要的功能
2. **上下文**: 在项目目录中运行 Claude Code，让它理解整个代码库
3. **迭代**: 如果结果不理想，提供反馈继续迭代
4. **版本控制**: Claude Code 会自动创建 commits，但建议定期检查更改
5. **测试**: 让 Claude 运行测试以确保更改不会破坏现有功能

## 相关资源

- **官方文档**: https://code.claude.com/docs
- **GitHub**: https://github.com/anthropics/claude-code
- **定价**: https://claude.com/pricing
- **Console**: https://console.anthropic.com/

## 何时使用此技能

当你需要：
- 安装或配置 Claude Code
- 使用 Claude Code 完成编程任务
- 集成 Claude Code 到现有工作流
- 排除 Claude Code 问题
- 了解 Claude Code 的高级功能
