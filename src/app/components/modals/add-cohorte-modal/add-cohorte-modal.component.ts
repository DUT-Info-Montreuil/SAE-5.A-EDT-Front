import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      personal_id: '',
      itemType: 'department'
  }
  group = {
    department_id: '',
    promotion: '',
    type: '',
    itemType: 'group'
  }
  subGroup = {
    name: '',
    group_id:'',
    department_id:'',
    itemType: 'subgroup'
  }
  organizeTDList: any[] = [];
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
  organizeDepartList: any[] = [];
  organizePersonalList: any [] = []

  constructor(private fb: FormBuilder) {
    this.addCohorteForm = this.fb.group({
    });
  }


  toggleDepartClicked(event : any) {
    this.organizeTDList = []
    const departmentTrouve = this.listeDepartment.find(departement =>
      departement[1]=== event.target.value
  );
    const filteredItemGroups = this.listeGroup.filter(itemGroup => itemGroup[2] === departmentTrouve[0]);
    this.organizeTDList.push(...filteredItemGroups);
    console.log(this.organizeTDList)
  
  
    this.departSelected = true;
    }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
    switch (this.selectedOption) {
        case "Créer un département":
          const professeurTrouve = this.listePersonel.find(professeur =>
            (professeur[1] +' '+ professeur[2] )=== this.department.personal_id 
        );
        this.department.personal_id = professeurTrouve[4]
          this.formSubmitted.emit(this.department);

            break;
        case "Créer un groupe (TD)":
          const departmentTrouve = this.listeDepartment.find(departement =>
            departement[1]=== this.group.department_id 
        );
        this.group.department_id = departmentTrouve[0]
          this.formSubmitted.emit(this.group);

            break;
        case "Créer un sous-groupe (TP)":
          const groupTrouve = this.listeGroup.find(group =>
            (group[1] + ', ' +group[3] + ' année') === this.subGroup.group_id 
          );
          this.subGroup.group_id = groupTrouve[0]
          this.formSubmitted.emit(this.subGroup);

            break;
        default:
            break;
    }
  }
}
