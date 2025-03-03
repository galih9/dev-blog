import { Component } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { CustomButtonComponent } from '../../../components/custom-button/custom-button.component';

@Component({
  selector: 'app-user-forms',
  imports: [InputComponent, CustomButtonComponent],
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.css'
})
export class UserFormsComponent {

}
