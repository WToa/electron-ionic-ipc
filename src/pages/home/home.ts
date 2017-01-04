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
