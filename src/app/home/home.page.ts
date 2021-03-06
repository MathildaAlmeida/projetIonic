import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  difficulty: string = "easy";
  difficulties: string[] = ["easy", "medium", "hard"];
  saveInfos: boolean = false;

  constructor(private toastCtrl: ToastController, private openTriviaSrv: OpenTriviaService) {}

  begin() {
    if (this.pseudo.length < 3) {
      this.showToast("Veuillez rentrer un pseudo de 3 caractères ou plus !", "danger");
    } 
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: "bottom",
      duration: 5000,
      color: color
    });
    toast.present();
  }

}
