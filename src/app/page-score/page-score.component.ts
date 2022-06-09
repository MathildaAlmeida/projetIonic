import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-score',
  templateUrl: './page-score.component.html',
  styleUrls: ['./page-score.component.scss'],
})
export class PageScoreComponent implements OnInit {

  score: number = 0;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  goToScore() {
     this.score ;
  }

  goBack() {
    this.navCtrl.navigateBack(['/home']);
  }


}
