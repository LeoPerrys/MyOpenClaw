# MCP (Model Context Protocol)

MCP 允许 Claude Code 连接到外部数据源和工具。

## 什么是 MCP？

MCP 是一个开放协议，让 AI 助手能够：
- 读取外部数据（Google Drive、Figma、Slack 等）
- 执行外部操作（创建 Jira ticket、更新 Notion 页面等）
- 使用自定义开发工具

## 内置 MCP 连接器

### Google Drive

读取设计文档、规格说明等：

```bash
# 配置
claude mcp add google-drive

# 使用
claude "从 Google Drive 读取最新的设计文档并实现"
```

### Figma

获取设计规格、组件信息：

```bash
claude mcp add figma

claude "根据 Figma 设计实现新的登录页面"
```

### Slack

读取团队讨论、发送消息：

```bash
claude mcp add slack

claude "总结 Slack 中关于这个 bug 的讨论"
```

### Jira

管理任务：

```bash
claude mcp add jira

claude "为这个 bug 创建 Jira ticket"
```

## 自定义 MCP 服务器

创建自己的 MCP 服务器来连接内部工具：

```python
# custom-mcp-server.py
from mcp import Server

server = Server("my-tools")

@server.tool()
def deploy_to_staging(version: str):
    """部署到 staging 环境"""
    # 部署逻辑
    return f"Deployed {version} to staging"

if __name__ == "__main__":
    server.run()
```

```bash
# 注册自定义服务器
claude mcp add ./custom-mcp-server.py

# 使用
claude "部署 v1.2.3 到 staging"
```

## 配置文件

MCP 配置存储在 `~/.claude/mcp.json`：

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-google-drive"]
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-figma"]
    }
  }
}
```

## 安全注意事项

- MCP 服务器可以访问敏感数据
- 只安装可信的 MCP 服务器
- 定期审查 MCP 权限
- 在企业环境中使用 MCP 时，遵循安全最佳实践

## 更多信息

- MCP 规范: https://modelcontextprotocol.io
- 内置服务器列表: https://github.com/modelcontextprotocol/servers
