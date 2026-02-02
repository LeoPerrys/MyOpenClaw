#!/bin/bash
# install-claude-code.sh - 自动安装 Claude Code

set -e

echo "🔧 开始安装 Claude Code..."

# 检测操作系统
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    MINGW*)     MACHINE=Windows;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

if [ "$MACHINE" = "Mac" ] || [ "$MACHINE" = "Linux" ]; then
    echo "✅ 检测到 $MACHINE 系统"
    
    # 方法 1: 使用官方安装脚本（推荐）
    echo "📥 使用官方安装脚本..."
    curl -fsSL https://claude.ai/install.sh | bash
    
    # 方法 2: 使用 Homebrew（仅 macOS）
    if [ "$MACHINE" = "Mac" ]; then
        if command -v brew &> /dev/null; then
            echo "🍺 使用 Homebrew 安装..."
            brew install --cask claude-code
        else
            echo "⚠️  未检测到 Homebrew，使用官方安装脚本"
        fi
    fi
    
    # 验证安装
    if command -v claude &> /dev/null; then
        echo "✅ Claude Code 安装成功！"
        echo ""
        echo "🚀 开始使用："
        echo "   cd your-project"
        echo "   claude"
    else
        echo "❌ 安装失败，请手动检查"
        exit 1
    fi
    
else
    echo "❌ 不支持的操作系统: $MACHINE"
    echo "请访问 https://code.claude.com/docs 查看安装说明"
    exit 1
fi
