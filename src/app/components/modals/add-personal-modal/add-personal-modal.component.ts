import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-personal-modal',
  templateUrl: './add-personal-modal.component.html',
  styleUrls: ['./add-personal-modal.component.css']
})
export class AddPersonalModalComponent {
  @Input() isOpen!: boolean;
  addPersonalForm: FormGroup
  
  constructor(private fb: FormBuilder) {
    this.addPersonalForm = this.fb.group({
    });
  }
}
