// main.js - Electron Main Process Entry Point

// 引入 dotenv，用于从 .env 文件加载环境变量
require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  // 创建一个新的浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      // 启用上下文隔离，并指定预加载脚本
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // 可选: 设置应用图标, 路径相对于项目根目录
    // icon: path.join(__dirname, 'assets/icon.png')
  });

  // 加载React应用的入口HTML文件 (从build文件夹)
  mainWindow.loadFile(path.join(__dirname, 'build/index.html'));

  // 可选: 默认打开开发者工具，方便调试
  // mainWindow.webContents.openDevTools();
}

// 当Electron完成初始化后，创建窗口
app.whenReady().then(() => {

  // 设置IPC监听器，用于安全地向渲染进程提供API密钥
  ipcMain.handle('get-api-key', () => {
    return process.env.API_KEY;
  });

  createWindow();

  app.on('activate', function () {
    // 在macOS上，当点击dock图标并且没有其他窗口打开时，
    // 通常会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都关闭时退出应用 (Windows & Linux)
app.on('window-all-closed', function () {
  // 在macOS上，应用和它们的菜单栏通常会保持活动状态，
  // 直到用户使用 Cmd + Q 显式退出。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});