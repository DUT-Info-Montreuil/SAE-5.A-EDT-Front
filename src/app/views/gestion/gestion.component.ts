import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { DateFormattingService } from 'src/app/services/date-formatting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  @Input() isOpen!: boolean;
  @Output() closed = new EventEmitter<boolean>();
  formattedDate: string | null;
  showAllStudents:boolean  = false;
  showCohorteSearch:boolean = false;
  searchIsOpen: boolean = false;
  gestionActuelle: string= "eleves";
  mapIdNomProfs = new Map<string, string>();
  mapIdNomSalles = new Map<string, string>();
  selectedDepartment:any = [];
  listeEleves: any[] = [];
  listeSubGroup: any[] = [];
  listeGroup:any [] = [];
  valeurInput: any = "";
  listeDepartment: any[] = []
  mapIdNomRessources = new Map<string, string>();
  limit: number = 3;
  isDeleteEleveClicked: boolean = false;
  isDepartmentClicked : boolean = false;
  isUpdateEleveModalOpen: boolean = false;
  isAddEleveModalOpen: boolean = false;
  isPromotionClicked: boolean = false;
  showAllCohorte: boolean = false;
  jsonEleve:any  = {
    department_id: '',
    first_name: '',
    group_id: '',
    last_name: '',
    mail: '',
    phone_number: '',
    student_number: '',
    subgroup_id: ''
  };  
  
  constructor( private dateFormattingService: DateFormattingService) {
    this.formattedDate = this.dateFormattingService.format(new Date());  
    this.initListeDepartment();
    this.initListeSubGroup();
    this.initListeGroup();
  }

  async deleteEleve(eleve : any) {
    this.isDeleteEleveClicked = !this.isDeleteEleveClicked;
    const confirmation = window.confirm("Êtes-vous sûr de vouloir effectuer cette action ?\n Cela supprimera definitivement "+ eleve[3] + " "+eleve[1]);
    if (confirmation) {
      let response = await axios.get(`${environment.apiUrl}/students/delete/${eleve[6]}`, {  });
    }
  }

  submitSearch() {
    this.listeEleves = this.listeEleves.filter(eleve =>
      eleve[3].toLowerCase().includes(this.valeurInput.toLowerCase()) ||
      eleve[1].toLowerCase().includes(this.valeurInput.toLowerCase())
    );
  }

  async departmentClick(department: any) {   
    this.isDepartmentClicked = true;
    this.selectedDepartment[1] = department[1]
    this.selectedDepartment[0] = department[0]
    this.listeEleves = [];
    let response = await axios.get(`${environment.apiUrl}/students/department/${department[0]}`, {  });
    let data = response.data.map((eleve: any) => [eleve.department_id, eleve.first_name,eleve.group_id, eleve.last_name, eleve.mail,eleve.phone_number, eleve.student_number, eleve.subgroup_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[0]) {
          tab[0] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[2]) {
          tab[2] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[7]) {
          tab[7] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });
  }
  async promotionClick(promo: number) {
    this.isPromotionClicked = !this.isPromotionClicked;
    
    let jsonData = {
      "department_id": this.selectedDepartment[0],
      "promotion": promo
    }
    //let response = await axios.post(`${environment.apiUrl}/groups/identify`, jsonData );
    //let data = response.data.map((group: any) => [group.id, group.department_id, group.type, group.promotion]);
    //data.forEach((tab: string[]) => {
    //  this.listeGroup.push(tab);
    //});
  }
  async initListeDepartment() {
    let response = await axios.get(`${environment.apiUrl}/departments/get`, {});
    let data = response.data.map((department: any) => [department.id, department.name]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.push(tab);
    });
  }
  async initListeSubGroup() {
    let response = await axios.get(`${environment.apiUrl}/subgroups/get`, {});
    let data = response.data.map((subgroup: any) => [subgroup.id, subgroup.name, subgroup.group_id]);
    data.forEach((tab: string[]) => {
      this.listeSubGroup.push(tab);
    });
  }
  async initListeGroup() {
    let response = await axios.get(`${environment.apiUrl}/groups/get`, {});
    let data = response.data.map((group: any) => [group.id, group.type, group.department_id, group.promotion]);
    data.forEach((tab: string[]) => {
      this.listeGroup.push(tab);
    });
  }

  async initEleveMap() {
    this.listeEleves = [];
    let response = await axios.get(`${environment.apiUrl}/students/get`, {});
    let data = response.data.map((eleve: any) => [eleve.department_id, eleve.first_name,eleve.group_id, eleve.last_name, eleve.mail,eleve.phone_number, eleve.student_number, eleve.subgroup_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[0]) {
          tab[0] = dept[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[7]) {
          tab[7] = subGroup[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[2]) {
          tab[2] = group[1];
        }
      });
      this.listeEleves.push(tab);
    });
    
    this.gestionActuelle = "eleves";
  }

  async initSalleMap () {
    let response = await axios.get(`${environment.apiUrl}/rooms/get`, {});
    let data = response.data.map((salle: any) => [salle.code, salle.id]);
    data.forEach((tab: string[]) => {
      this.mapIdNomSalles.set(tab[0], tab[1]);
    });
    this.gestionActuelle = "salles";
  }

  async initProfesseurMap() {
    let response = await axios.get(`${environment.apiUrl}/personals/get`, {});
    let data = response.data.map((prof: any) => [prof.personal_code, prof.id]);
    data.forEach((tab: string[]) => {
      this.mapIdNomProfs.set(tab[0], tab[1]);
    });
    this.gestionActuelle = "professeurs";
  }

  async initRessourceMap() {
    let response = await axios.get(`${environment.apiUrl}/courses/get`, {});
    let data = response.data.map((ressource: any) => [ressource.course_type, ressource.id]);
    data.forEach((tab: string[]) => {
      this.mapIdNomRessources.set(tab[0], tab[1]);
    });
    this.gestionActuelle = "ressources";
  }

  afficherTousLesEleves() {
    this.initEleveMap();
      this.showAllStudents = true
      this.showAllCohorte =false
    }  

  afficherLesCohortes() {
      this.showAllCohorte = true
      this.showAllStudents = false;
   }


  updateGestionActuelle(str: string) {
    this.gestionActuelle = str;
  }

  afficherPlus() {
    this.limit += 4; 
  }

  afficherMoins() {
    this.limit -= 4; 
  }
  
  openAddEleveModal(){
      this.isAddEleveModalOpen = true;
  }

  closeAddEleveModal(reload?: boolean) {
      this.isAddEleveModalOpen = false;
  }

  openUpdateEleveModal(eleve : any) {
    Object.keys(this.jsonEleve).forEach((key, index) => {
      this.jsonEleve[key] = eleve[index];
    }); 
    this.isUpdateEleveModalOpen = true;
  }
  closeUpdateEleveModal(reload?: boolean) {
      this.isUpdateEleveModalOpen = false;
  }
}
