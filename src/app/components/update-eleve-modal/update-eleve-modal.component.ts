import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-eleve-modal',
  templateUrl: './update-eleve-modal.component.html',
  styleUrls: ['./update-eleve-modal.component.css']
})
export class UpdateEleveModalComponent implements OnInit{
  @Input() isOpen!: boolean;
  @Input() eleve = {
    department_id: '',
    last_name: '',
    first_name: '',
    mail: '',
    phone_number: '',
    subgroup_id: '',
    group_id: '',
    user_id:''
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

  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
  }
  ngOnInit(): void {
    this.listeGroup.forEach((item, index) => {
      this.organizeTDList.push([item]);
    });
    this.listeSubGroup.forEach((item, index) => {
      this.organizeTPList.push([item]);
      
    });
    this.listeDepartment.forEach((item, index) => {
      this.organizeDepartList.push(item);
    });
  }

  toggleDepartClicked(event : any) {
    this.isDepartmentClicked = !this.isDepartmentClicked;
    this.organizeTDList = []
    this.departmentTrouve = this.listeDepartment.find(departement =>
      departement[1]=== event.target.value
  );
    const filteredItemGroups = this.listeGroup.filter(itemGroup => itemGroup[2] === this.departmentTrouve[0]);
    this.organizeTDList.push(...filteredItemGroups);
  }  


  toggleTDClicked(event:any) {
    this.organizeTPList = []
    this.isTDClicked = !this.isTDClicked;
    this.groupTrouve = this.listeGroup.find(group =>
      (group[1] + ', ' +group[3] + ' année') === event.target.value 
      );
    const filteredItemSubGroups = this.listeSubGroup.filter(itemGroup => itemGroup[2] === this.groupTrouve[0]);
    this.organizeTPList.push(...filteredItemSubGroups);
  }

  toggleTPClicked(event:any) {
    this.isTPClicked = !this.isTPClicked;
    console.log("departClick = "+ event.target.value)

  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
   const updatedValues = {
      lastName: this.eleve.last_name,
      firstName: this.eleve.first_name,
      department_id: 1,
      mail: this.eleve.mail,
      phone_number: this.eleve.phone_number,
      subgroup_id: 38,
      group_id: 38,
      user_id: this.eleve.user_id
    };

    this.formSubmitted.emit(updatedValues);
  }
  
}
