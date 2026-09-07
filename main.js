const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  win.loadFile(path.join(__dirname, 'مكتب_المحاماة.html'));
}

app.whenReady().then(() => {
  // Electron's persistent session keeps localStorage/IndexedDB/cookies/files
  // between launches. Data is stored in the user's AppData folder, not RAM.
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(true));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
