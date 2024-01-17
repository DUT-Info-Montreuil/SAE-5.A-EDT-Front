import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-cohorte-modal',
  templateUrl: './delete-cohorte-modal.component.html',
  styleUrls: ['./delete-cohorte-modal.component.css']
})
export class DeleteCohorteModalComponent {

  @Input() isOpen!: boolean;
  tdSelected: boolean = false;
  departSelected: boolean = false;
  department = {
      degree_type: '',
      description: '',
      name: '',
      personal_id: '',
      itemType: 'department',
      id:''
  }
  group = {
    department_id: '',
    promotion: '',
    type: '',
    itemType: 'group',
    id:''
  }
  subGroup = {
    name: '',
    group_id:'',
    department_id:'',
    itemType: 'subgroup',
    id:''
  }
  organizeTDList: any[] = [];
  organizeTpList: any[] = [];
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();
  @Input() listeDepartment!: any[];
  @Input() listeGroup!: any[];
  @Input() listePersonel!: any[];
  @Input() listeSubGroup!: any[];
  deleteCohorteForm: FormGroup;
  organizeDepartList: any[] = [];
  selectedOption: string = 'Supprimer un département'


  constructor(private fb: FormBuilder) {
    this.deleteCohorteForm = this.fb.group({
    });
  }
  toggleTdClicked(event : any) {
    this.organizeTpList = []
    this.tdSelected = true
    const groupTrouve = this.listeGroup.find(group =>
      (group[1] + ', ' +group[3] + ' année') === event.target.value 
      );
    const filteredItemSubGroups = this.listeSubGroup.filter(itemGroup => itemGroup[2] === groupTrouve[0]);
    this.organizeTpList.push(...filteredItemSubGroups);
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
        case "Supprimer un département":
          const departmentTrouve = this.listeDepartment.find(departement =>
            departement[1]=== this.department.id
        );
        this.department.id = departmentTrouve[0]
        this.formSubmitted.emit(this.department);

          break;
        case "Supprimer un groupe (TD)":
          const groupTrouve = this.listeGroup.find(group =>
            (group[1] + ', ' +group[3] + ' année') === this.group.id
            );
        this.group.id = groupTrouve[0]
         this.formSubmitted.emit(this.group);

          break;
        case "Supprimer un sous-groupe (TP)":
          const subGroupTrouver = this.listeSubGroup.find(subgroup =>
            subgroup[1]=== this.subGroup.id
        );
        this.subGroup.id = subGroupTrouver[0]
          this.formSubmitted.emit(this.subGroup);

          break;
        default:
            break;
    }
    this.close()
  }
}
