const { app, BrowserWindow } = require('electron')
const {join} = require("path")

let createWindow = () => {
  console.log("Launch")
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: join(__dirname, 'gear.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) createWindow()
})