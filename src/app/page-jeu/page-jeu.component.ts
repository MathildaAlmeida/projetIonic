import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia.service';

@Component({
  selector: 'app-page-jeu',
  templateUrl: './page-jeu.component.html',
  styleUrls: ['./page-jeu.component.scss'],
})
export class PageJeuComponent implements OnInit {

  pseudo: string = "";
  difficulty: string = "easy";
  difficulties: string[] = ["easy", "medium", "hard"];
  saveInfos: boolean = false;
  nextQuestion: boolean = false;
  nbQuestions: number = 10;
  listQuestions: any[] = [];
  indexQuestion: number = 0;
  currentQuestion: any;
  endGame: boolean = false;
  score: number = 0;


  constructor( private toastCtrl: ToastController, private openTriviaSrv: OpenTriviaService) { }

  ngOnInit() {
    this.loadQuestions();
  }

  async loadQuestions() {

    try {
      this.listQuestions = await this.openTriviaSrv.getQuestions(this.nbQuestions, this.difficulty);
      this.loadCurrentQuestion();
    } catch (error) {
      this.showToast(error, "danger");
    }
  }

  loadCurrentQuestion() {
    this.currentQuestion = this.listQuestions[this.indexQuestion];
    this.currentQuestion.answers = [];
    this.currentQuestion.answers.push(this.currentQuestion.correct_answer);
    this.currentQuestion.incorrect_answers.forEach(element => {
      this.currentQuestion.answers.push(element);
    });
    this.currentQuestion.answers.sort(() => 0.5 - Math.random());
  }

  answer(response: string) {
    if (this.currentQuestion.correct_answer == response && !this.nextQuestion) {
      this.score++;
    }
    this.nextQuestion = true;
  }

  next() {
    this.indexQuestion++;
    this.nextQuestion = false;
    this.loadCurrentQuestion();
    if (this.indexQuestion >= this.listQuestions.length - 1) {
      this.endGame = true;
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
