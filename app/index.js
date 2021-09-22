const { app, BrowserWindow } = require('electron')


function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        minHeight: 800,
        minWidth: 600,
        center: true,
        darkTheme: true,
        icon: "./src/assets/img/logo.png",
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./src/index.html');
    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})
