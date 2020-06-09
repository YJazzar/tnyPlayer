// Importing electron
const { app, BrowserWindow, ipcMain, Menu } = require('electron');         // For the electron app
const path = require("path");

// Importing custom scripts
const Logger = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');
const { getMenuTemplate } = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/helperFunctions/MenuTemplate.js');


let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // Logger.logInfo(__filename, "BrowserWindow created");

    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    win.webContents.openDevTools()

    // Quit app when closed 
    win.on('closed', function () {
        Logger.logInfo(__filename, "Quitting application");
        app.quit();
    });

    // Insert menu:
    // let menuTemplate = Menu.buildFromTemplate(getMenuTemplate(app, win));
    // // if you comment this line out, you will get the boilerplate menu thats already there by default
    // Menu.setApplicationMenu(menuTemplate);
}

// This method will be called when Electron has finished
app.whenReady().then(createWindow)



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


// // This allows for the script to wait until the webpage is loaded 
// ipcMain.on("loadDone", function (e, data) {
//     Logger.logInfo(__filename, "Done loading everything");
// });

// // An event to use the logger from the electron browser
// ipcMain.on("Logger", (e, message) => {
//     Logger.log(message.level, message.source, message.message);
// })
