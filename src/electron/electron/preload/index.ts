import { ipcRenderer, contextBridge } from 'electron';

// ***AIRBAR - START
const api: Api = {
  onLoadTaskbarTasks: (callback) => {
    ipcRenderer.on('loadTaskbarTasks', callback);
  },
  onRemindToTrackTime: (callback) =>
    ipcRenderer.on('remindToTrackTime', (_event, reason) => callback(reason)),
  onTaskWidgetWindowFocused: (callback) => ipcRenderer.on('taskWidgetWindowFocused', callback),
  onTaskbarHoverChanged: (callback) =>
    ipcRenderer.on('taskbarHoverChanged', (_event, isHovered) => callback(isHovered)),
  onTaskbarMovedByUser: (callback) => ipcRenderer.on('taskbarMovedByUser', callback),
  onTaskbarSideChanged: (callback) =>
    ipcRenderer.on('taskbarSideChanged', (_event, side) => callback(side)),
  isMacOS: (): boolean => process.platform === 'darwin'
};

interface Api {
  onLoadTaskbarTasks: (cb) => void;
  onRemindToTrackTime: (cb) => void;
  onTaskWidgetWindowFocused: (cb) => void;
  onTaskbarHoverChanged: (cb: (isHovered: boolean) => void) => void;
  onTaskbarMovedByUser: (cb: () => void) => void;
  onTaskbarSideChanged: (cb: (side: 'left' | 'right') => void) => void;
  isMacOS: () => boolean;
}

contextBridge.exposeInMainWorld('api', api);
// ***AIRBAR - END

// Expose only the IPC operation used by the renderer. Copying ipcRenderer's prototype is brittle
// across Electron releases and stopped exposing invoke() in Electron 43.
contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args)
});
