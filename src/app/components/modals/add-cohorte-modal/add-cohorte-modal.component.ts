import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-add-cohorte-modal',
  templateUrl: './add-cohorte-modal.component.html',
  styleUrls: ['./add-cohorte-modal.component.css']
})
export class AddCohorteModalComponent {
  @Input() isOpen!: boolean;
  department = {
    
      degree_type: '',
      description: '',
      name: '',
      personal_id: ''
  }
  group = {
    department_id: '',
    promotion: '',
    type: ''
  }
  subGroup = {
    name: '',
    group_id:'',
    department_id:''
  }
  departSelected: boolean = false;
  selectedOption: string = 'Créer un département'
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();
  @Input() listeDepartment!: any[];
  @Input() listeGroup!: any[];
  @Input() listePersonel!: any[];
  @Input() listeSubGroup!: any[];
  addCohorteForm: FormGroup;
  isDepartmentClicked: boolean = false;
  organizeTDList: any[] = [];
  organizeDepartList: any[] = [];
  organizePersonalList: any [] = []
 

  constructor(private fb: FormBuilder) {
    this.addCohorteForm = this.fb.group({
    });
  }
  ngOnInit(): void {
    console.log(this.listeGroup)
  }

  onSelectChange() {
    switch (this.selectedOption) {
      case 'Créer un département':

      break;

      case 'Créer un groupe (TD)':
       
        break;

      case 'Créer un sous-groupe (TP)':
       
        break;

      default:
        break;
      }
    }

  toggleDepartClicked(event : any) {
    this.listeDepartment.forEach((itemDepartment, indexDepartment) => {
      if (itemDepartment[1] = event.target.value) {
        const filteredItemGroups = this.listeGroup.filter(itemGroup => itemGroup[2] === itemDepartment[0]);
        this.organizeTDList.push(...filteredItemGroups);
      }
  });
  
    this.departSelected = true;


    }

  toggleTDClicked(event:any) {
    console.log("departClick = "+ event.target.value)

  }

  toggleTPClicked(event:any) {
    console.log("departClick = "+ event.target.value)

  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
   

    const updatedValues = {
     
    };

    this.formSubmitted.emit(updatedValues);
  }
  
}
