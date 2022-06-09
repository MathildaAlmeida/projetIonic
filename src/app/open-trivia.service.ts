import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  url: string = "https://opentdb.com/api.php";

  constructor(private http: HttpClient) { }

  async getQuestions(nbQuestions: number, difficulty: string) {
    let result: any = await this.http.get(this.url + "?amount=" + nbQuestions + "&difficulty=" + difficulty).toPromise();
    if (result != null) {
      return result.results;
    } else {
      throw Error("Erreur : impossible de récupérer les questions ! Vérifiez votre connexion !");
    }

    // return new Promise((resolve, reject) => {
    //   this.http.get(this.url + "?amount=" + nbQuestions + "&difficulty=" + difficulty).toPromise().then((result: any) => {
    //     if (result != null) {
    //       resolve(result.results);
    //     } else {
    //       reject("Erreur : impossible de récupérer les questions ! Vérifiez votre connexion !");
    //     }
    //   });
    // });
  }
}
