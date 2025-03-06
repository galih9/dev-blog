import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// jsons
import hiragana from '../../../assets/hiragana.json';
import hiraganaDa from '../../../assets/hiragana_dakuten.json';
import hiraganaYo from '../../../assets/hiragana_yoon.json';
import katakana from '../../../assets/katakana.json';
import katakanaDa from '../../../assets/katakana_dakuten.json';
import katakanaYo from '../../../assets/katakana_yoon.json';

interface ICharJP {
  hira: string;
  alpha: string;
  id: string;
}

@Component({
  selector: 'app-learning-page',
  imports: [CommonModule],
  templateUrl: './learning-page.component.html',
  styleUrl: './learning-page.component.css',
})
export class LearningPageComponent {
  hiraganaCharacter: ICharJP[] = [];
  katakanaCharacter: ICharJP[] = [];
  hiraganaDakuon: ICharJP[] = [];
  katakanaDakuon: ICharJP[] = [];
  hiraganaYoon: ICharJP[] = [];
  katakanaYoon: ICharJP[] = [];

  constructor() {
    this.hiraganaCharacter = hiragana;
    this.katakanaCharacter = katakana;
    this.hiraganaDakuon = hiraganaDa;
    this.katakanaDakuon = katakanaDa;
    this.hiraganaYoon = hiraganaYo;
    this.katakanaYoon = katakanaYo;
  }
}
