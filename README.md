# 照片魔法AI

这是一个由 Google Gemini API 驱动的跨平台照片处理工具。用户可以上传一张或多张图片，并一键应用令人惊叹的、堪比 Photoshop 的效果。

该项目使用 React、TypeScript、Electron 和 Capacitor 构建，可部署为桌面应用和移动应用。

## 功能特性

-   **单图编辑**: 应用多种创意滤镜和效果，如复古、电影色调、赛博朋克等。
-   **多图合成**: 支持上传多张图片，并使用 AI 进行智能场景融合或创建艺术拼贴。
-   **历史记录**: 无损编辑流程，支持无限次撤销和重做。
-   **跨平台**: 可打包成 Windows (.exe), macOS (.dmg), Linux (.AppImage) 桌面应用，以及安卓 (.apk) 移动应用。

## 项目设置

请确保您的电脑上已经安装了 [Node.js](https://nodejs.org/) (推荐 v18 或更高版本)。

### 1. 克隆项目

```bash
git clone <repository-url>
cd photo-magic-ai-desktop
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置 API 密钥

此项目需要一个 Google Gemini API 密钥才能运行。

- **对于桌面版 (Electron):**
    1. 在项目根目录中，创建一个名为 `.env` 的新文件。
    2. 在 `.env` 文件中添加以下内容，将 `YOUR_API_KEY_HERE` 替换为您自己的密钥：
    ```
    API_KEY="AIzaSy...your...actual...api...key"
    ```
- **对于Web/移动版 (Capacitor):**
    应用会尝试从环境变量 `process.env.API_KEY` 中读取密钥。请确保在构建环境（例如 CI/CD 或部署平台）中设置了此变量。

> **重要**: `.env` 文件包含了您的私密密钥，请不要将此文件提交到任何公共代码仓库。

---

## 构建与运行桌面版 (Windows, macOS, Linux)

### 在开发模式下运行

使用此命令启动带开发者工具的桌面应用：

```bash
npm run start:desktop
```

### 打包成安装程序 (.exe, .dmg)

当您准备好将应用分享给他人时，可以将其打包成一个可执行的安装文件。

```bash
npm run pack:desktop
```

打包完成后，您会在项目根目录下找到一个新的 `dist` 文件夹，其中包含对应您当前操作系统的安装文件。

---

## 构建安卓应用 (APK)

我们使用 [Capacitor](https://capacitorjs.com/) 将现有的 Web 应用代码打包成一个原生的安卓应用。

### 环境要求

- 确保已安装 **Android Studio**，并已正确配置安卓开发环境（SDK, Gradle等）。

### 构建步骤

1.  **初始化 Capacitor (仅需首次运行)**

    如果您是第一次为项目设置移动版，请在项目根目录运行 `capacitor.config.ts` 文件以初始化 Capacitor。
    > 注意: 项目中已包含 `capacitor.config.ts` 文件，您无需手动创建。


2.  **添加安卓平台 (仅需首次运行)**

    此命令会在您的项目中创建一个 `android` 文件夹，其中包含原生的安卓项目文件。

    ```bash
    npm run android:add
    ```

3.  **同步 Web 代码到原生项目**

    每当您对 Web 代码（React 组件等）进行了更改后，都需要运行此命令将最新的 `build` 产物同步到安卓项目中。

    ```bash
    npm run android:sync
    ```

4.  **在 Android Studio 中打开项目**

    此命令会自动打开 Android Studio 并加载安卓项目。

    ```bash
    npm run android:open
    ```

5.  **构建 APK**

    在 Android Studio 中，您可以使用其图形化界面来：
    -   在模拟器或真实设备上运行和调试应用。
    -   通过 `Build > Build Bundle(s) / APK(s) > Build APK(s)` 菜单生成一个可用于分发的 APK 文件。

生成的 APK 文件通常位于 `android/app/build/outputs/apk/debug/` 目录中。