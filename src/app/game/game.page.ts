import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo: string = "";
  difficulty: string = "easy";
  nextQuestion: boolean = false;
  nbQuestions: number = 10;
  listQuestions: any[] = [];
  indexQuestion: number = 0;
  currentQuestion: any;
  endGame: boolean = false;
  score: number = 0;

  constructor(private openTriviaSrv: OpenTriviaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.pseudo = this.activatedRoute.snapshot.params.pseudo;
    this.difficulty = this.activatedRoute.snapshot.params.difficulty;
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

  goToScore() {
    this.router.navigate(['/score', this.score]);
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
