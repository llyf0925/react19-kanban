import { useEffect, useState } from 'react'

// TODO: 第 1 天你要实现这个自定义 Hook
// 要求:
//   1. 初始化时从 localStorage 读 key 对应的值(没有则用 initial)
//   2. value 变化时同步写回 localStorage(注意 useEffect 依赖数组)
// 提示:参考 D:\2026\React19练习\答案\src\02-进阶篇\ex01_自定义Hook.tsx
export function useLocalStorage<T>(_key: string, _initial: T): [T, (v: T) => void] {
  // TODO: 实现
  throw new Error('useLocalStorage not implemented yet')
}
