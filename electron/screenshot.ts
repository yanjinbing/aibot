import {globalShortcut } from 'electron'

import Screenshots from 'electron-screenshots';

export function initScreenshot(){
    const screenshots = new Screenshots();

    // 注册全局快捷键以触发截图功能
    globalShortcut.register('Ctrl+Shift+X', () => {
        screenshots.startCapture();
    });

    // 监听截图完成事件
    screenshots.on('ok', (_e: Event, buffer: Buffer, bounds: Electron.Rectangle) => {
        console.log('capture', buffer, bounds);
        // 在这里你可以处理截图结果，例如保存到文件或发送到服务器
    });

    // 监听取消截图事件
    screenshots.on('cancel', () => {
        console.log('capture cancelled');
    });

    globalShortcut.register("esc", () => {
        if (screenshots.$win?.isFocused()) {
            screenshots.endCapture();
        }
    });

    // 其他事件监听和处理...
};