# VS Code 集成

Claude Code 提供了 VS Code 扩展，可以直接在编辑器中使用。

## 安装扩展

1. 打开 VS Code
2. 进入扩展市场（Ctrl+Shift+X）
3. 搜索 "Claude Code"
4. 点击安装

## 功能特性

- **内联差异**: 直接在编辑器中查看代码更改
- **@提及**: 在代码中 @ 提及文件或符号
- **计划审查**: 在实施前审查 Claude 的计划
- **上下文共享**: 与终端版本的 Claude Code 共享上下文

## 使用方法

### 基本使用

```typescript
// 在编辑器中选中代码，然后使用命令面板（Ctrl+Shift+P）
// 运行 "Claude Code: Explain" 或 "Claude Code: Edit"

// 或者使用 @ 提及
// @Claude 这个函数如何优化？
function calculateTotal(items: Item[]) {
  // ...
}
```

### 命令列表

- `Claude Code: Explain` - 解释选中的代码
- `Claude Code: Edit` - 编辑选中的代码
- `Claude Code: Fix` - 修复选中的代码
- `Claude Code: Test` - 为选中的代码生成测试
- `Claude Code: Refactor` - 重构选中的代码

## 配置

在 VS Code 设置中搜索 "claude code" 可以配置：
- API 端点
- 模型选择
- 自动保存行为
- 差异显示样式
