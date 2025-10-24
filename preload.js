// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 使用 contextBridge 在渲染进程的 window 对象上暴露一个安全的 API
// 这样渲染进程就可以调用这里定义的方法，而无需访问整个 Node.js 环境
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * 异步调用主进程以获取 API 密钥。
   * @returns {Promise<string>} 一个解析为 API 密钥字符串的 Promise。
   */
  getApiKey: () => ipcRenderer.invoke('get-api-key')
});
