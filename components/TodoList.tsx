'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 从 localStorage 加载待办事项
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const parsedTodos = JSON.parse(saved);
      setTodos(parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      })));
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">待办清单</h1>
          <p className="text-gray-500">高效管理你的任务</p>
        </div>

        {/* 主卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* 添加任务输入框 */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="添加新任务..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors text-gray-700"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              添加
            </button>
          </div>

          {/* 过滤器 */}
          <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'active'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              进行中
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'completed'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              已完成
            </button>
          </div>

          {/* 任务列表 */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-lg">暂无任务</p>
                <p className="text-sm mt-1">添加一个新任务开始吧！</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>

          {/* 底部统计 */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
              <span>{activeCount} 个进行中 · {completedCount} 个已完成</span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  清除已完成
                </button>
              )}
            </div>
          )}
        </div>

        {/* 提示 */}
        <div className="text-center text-sm text-gray-500">
          💾 数据会自动保存在浏览器中
        </div>
      </div>
    </div>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className={`group flex items-center gap-3 p-4 rounded-xl transition-all ${
      todo.completed
        ? 'bg-gray-50 opacity-75'
        : 'bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100'
    }`}>
      {/* 复选框 */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-orange-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* 任务文本 */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          onBlur={handleSave}
          className="flex-1 px-3 py-2 border-2 border-orange-400 rounded-lg focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          onClick={() => !todo.completed && setIsEditing(true)}
          className={`flex-1 cursor-pointer ${
            todo.completed
              ? 'line-through text-gray-400'
              : 'text-gray-800 font-medium'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.completed && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="编辑"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="删除"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
