import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-eleve-modal',
  templateUrl: './add-eleve-modal.component.html',
  styleUrls: ['./add-eleve-modal.component.css']
})
export class AddEleveModalComponent {
  @Input() isOpen!: boolean;
  @Output() closed = new EventEmitter<boolean>();

  updateEleveForm: FormGroup;
  @Input() listeDepartment!: any[];
  @Input() listeGroup!: any[];
  @Input() listeSubGroup!: any[];
  jsonEleve = {
    last_name: '',
    first_name: '',
    mail: '',
    phone_number: '',
    subgroup_id: '',
    group_id: '',
    department_id: ''
  };  
  organizeTPList: any[] = [];
  organizeTDList: any[] = [];
  departSelected: boolean = false;
  tDSelected: boolean = false
  departmentTrouve : any [] = []
  groupTrouve: any [] = []
  
  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
}
 submit(){

 }
 tdClicked(event: any) {
  this.tDSelected = true;
  this.groupTrouve = this.listeGroup.find(group =>
    (group[1] + ', ' +group[3] + ' année') === event.target.value 
  );
  const filteredItemSubGroups = this.listeSubGroup.filter(itemGroup => itemGroup[2] === this.groupTrouve[0]);
  this.organizeTPList.push(...filteredItemSubGroups);
 }
 departClicked(event : any) {
    this.organizeTDList = []
    this.departmentTrouve = this.listeDepartment.find(departement =>
      departement[1]=== event.target.value
  );
    const filteredItemGroups = this.listeGroup.filter(itemGroup => itemGroup[2] === this.departmentTrouve[0]);
    this.organizeTDList.push(...filteredItemGroups);
    this.departSelected = true;
    }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

}
