#!/bin/bash
# setup-auth.sh - 配置 Claude Code 认证

set -e

echo "🔑 配置 Claude Code 认证..."

# 检查是否已安装
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code 未安装"
    echo "请先运行: bash scripts/install-claude-code.sh"
    exit 1
fi

# 检查是否已认证
if claude --auth &> /dev/null; then
    echo "✅ 已经认证过"
    claude --whoami
else
    echo "📝 首次使用，需要登录..."
    claude
    
    echo ""
    echo "✅ 认证完成！"
    echo ""
    echo "🚀 现在可以使用 Claude Code："
    echo "   cd your-project"
    echo "   claude"
fi
