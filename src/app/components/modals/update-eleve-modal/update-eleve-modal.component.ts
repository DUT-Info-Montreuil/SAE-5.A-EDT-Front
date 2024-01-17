import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-eleve-modal',
  templateUrl: './update-eleve-modal.component.html',
  styleUrls: ['./update-eleve-modal.component.css']
})
export class UpdateEleveModalComponent{
  @Input() isOpen!: boolean;
  @Input() eleve = {
    department_id: '',
    last_name: '',
    first_name: '',
    subgroup_id: '',
    group_id: '',
    id: ''
  };  
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();
  @Input() listeDepartment!: any[];
  @Input() listeGroup!: any[];
  @Input() listeSubGroup!: any[];
  isTDClicked: boolean = false;
  isTPClicked: boolean = false;
  updateEleveForm: FormGroup;
  isDepartmentClicked: boolean = false;
  organizeTDList: any[] = [];
  organizeTPList: any[] = [];
  organizeDepartList: any[] = [];
  departmentTrouve : any [] = []
  groupTrouve: any [] = []
  sousGroupTrouve: any [] = []
  isDepartChange = false
  isTdChange = false

  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
  }
  departChange(event : any) {
    this.organizeTDList = []
    this.departmentTrouve = this.listeDepartment.find(departement =>
      departement[1]=== event.target.value
  );
    const filteredItemGroups = this.listeGroup.filter(itemGroup => itemGroup[2] === this.departmentTrouve[0]);
    this.organizeTDList.push(...filteredItemGroups);
    this.isDepartChange = true
  }

  toggleDepartClicked() {
    this.isDepartmentClicked = true;
    
  }  
  changeTd(event : any) {
    this.isTdChange = true
    this.organizeTPList = []
    this.groupTrouve = this.listeGroup.find(group =>
      (group[1] + ', ' +group[3] + ' année') === event.target.value 
      );
    const filteredItemSubGroups = this.listeSubGroup.filter(itemGroup => itemGroup[2] === this.groupTrouve[0]);
    this.organizeTPList.push(...filteredItemSubGroups);
  }

  toggleTDClicked(event:any) {
    this.isTDClicked = true;
  }

  toggleTPClicked(event:any) {
    this.isTPClicked = !this.isTPClicked;
    this.sousGroupTrouve = this.listeSubGroup.find(subgroup =>
      subgroup[1] === event.target.value 
    );
    this.eleve.department_id = this.sousGroupTrouve[0]
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
    this.eleve.department_id = this.departmentTrouve[0]
    this.eleve.group_id = this.groupTrouve[0]
    this.eleve.subgroup_id = this.sousGroupTrouve[0]
    

    this.formSubmitted.emit(this.eleve);
    this.close()
  }
  
}
