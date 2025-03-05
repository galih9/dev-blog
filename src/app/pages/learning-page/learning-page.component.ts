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
    this.hiraganaCharacter.splice(36, 0, {
      hira: '',
      alpha: '',
      id: 'empty-36',
    });
    this.hiraganaCharacter.splice(38, 0, {
      hira: '',
      alpha: '',
      id: 'empty-38',
    });
    this.hiraganaCharacter.splice(46, 0, {
      hira: '',
      alpha: '',
      id: 'empty-46',
    });
    this.hiraganaCharacter.splice(47, 0, {
      hira: '',
      alpha: '',
      id: 'empty-47',
    });
    this.hiraganaCharacter.splice(48, 0, {
      hira: '',
      alpha: '',
      id: 'empty-48',
    });
    this.katakanaCharacter = katakana;
    this.katakanaCharacter.splice(36, 0, {
      hira: '',
      alpha: '',
      id: 'empty-36',
    });
    this.katakanaCharacter.splice(38, 0, {
      hira: '',
      alpha: '',
      id: 'empty-38',
    });
    this.katakanaCharacter.splice(46, 0, {
      hira: '',
      alpha: '',
      id: 'empty-46',
    });
    this.katakanaCharacter.splice(47, 0, {
      hira: '',
      alpha: '',
      id: 'empty-47',
    });
    this.katakanaCharacter.splice(48, 0, {
      hira: '',
      alpha: '',
      id: 'empty-48',
    });
    this.hiraganaDakuon = hiraganaDa;
    this.katakanaDakuon = katakanaDa;
    this.hiraganaYoon = hiraganaYo;
    this.katakanaYoon = katakanaYo;
  }
}
