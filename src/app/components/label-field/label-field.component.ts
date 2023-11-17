import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-field',
  templateUrl: './label-field.component.html',
  styleUrls: ['./label-field.component.css']
})
export class LabelFieldComponent {
  @Input() affichage!: string;

}
