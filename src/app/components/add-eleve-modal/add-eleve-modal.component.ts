import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-eleve-modal',
  templateUrl: './add-eleve-modal.component.html',
  styleUrls: ['./add-eleve-modal.component.css']
})
export class AddEleveModalComponent {
  @Input() isOpen!: boolean;
  @Output() closed = new EventEmitter<boolean>();

  updateEleveForm: FormGroup;

  jsonEleve = {
    last_name: '',
    first_name: '',
    mail: '',
    phone_number: '',
    subgroup_id: '',
    group_id: '',
    student_number: ''
  };  

  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
}
  async submit() {
  //  let response = await axios.post(`${environment.apiUrl}/students/add`, this.jsonEleve);
    console.log(this.jsonEleve)
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

}
