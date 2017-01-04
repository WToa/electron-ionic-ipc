# electron-ionic-ipc
A starter application combining the Electron and Ionic framework

## Initialzing the application

1. Clone the repository
2. ```npm install```
3. ```npm run build```
4. ```npm start```


## Files of Interest

**src/app/pages/home/home.ts**
```
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var electron : any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

    console.log("Sending message..");

    electron.ipcRenderer.send("test_channel","ping");
    electron.ipcRenderer.on("test_channel",function(err,arg){
      console.log("Message received from electron: "+arg);
    })
  }

}
```

**electron.js**

```
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const {BrowserWindow, ipcMain} = electron;
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'www/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  ipcMain.on("test_channel",function(err,arg){
      console.log(err);

      console.log("Received message: "+arg);

      console.log("Sending message back!");
      // Send message back!
      mainWindow.webContents.send("test_channel","pong");
  })



  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

    //event.sender.send('asynchronous-reply', 'pong');


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)




// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```
