import { Component, EventEmitter, Input, Output } from '@angular/core';
import axios from 'axios';
import { AuthService } from 'src/app/services/auth.service';
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
  showCohorteSearch:boolean = false;
  showAllStudents: boolean = true;
  searchIsOpen: boolean = false;
  gestionActuelle: string= "eleves";
  listeProfs: any[] = [];
  listeSalles: any[] = [];
  selectedDepartment:any = [];
  listeEleves: any[] = [];
  listeSubGroup: any[] = [];
  listeGroup:any [] = [];
  valeurInput: any = "";
  listeRecherche: any[] = []
  listeDepartment: any[] = []
  listeRessources: any[] = [];
  limit: number = 5;
  addCohorteClicked: boolean = false;
  isDepartmentClicked : boolean = false;
  isUpdateEleveModalOpen: boolean = false;
  isUpdateProfModalOpen: boolean = false;
  isAddEleveModalOpen: boolean = false;
  isUpdateSalleModalOpen:boolean = false;
  updateEleveClicked:boolean = false
  isUpdateRessourceModalOpen:boolean = false;
  isTDClicked: boolean = false;
  isTPClicked: boolean = false;
  isPromotionClicked: boolean = false;
  showAllCohorte: boolean = false;
  selectedTD: any[] = []

  jsonRessource:any  = {
    title: '',
    teaching_type: '',
    semestre: '',
    hour_number: '',
    color: '',
    sequence: ''
  }; 
  jsonEleve:any  = {
    last_name: '',
    first_name: '',
    mail: '',
    phone_number: '',
    group_id: '',
    department_id: '',
    user_id: '',
    subgroup_id: ''
  };  
  jsonProf: any = {
    first_name: '',
    last_name: '',
    mail: '',
    personal_code: '',
    id: ''
  };
  jsonSalle: any = {
    code: '',
    capacity: '',
    has_computer: '',
    has_projector: ''
  };  
  
  constructor( private dateFormattingService: DateFormattingService, private authService: AuthService) {
    this.formattedDate = this.dateFormattingService.format(new Date());  
    this.initListeGroup()
    this.initListeDepartment()
    this.initListeSubGroup()
    this.initEleveMap();
    this.initProfesseurMap();

  }
 
  async addCohorte(formData : any, ) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    switch (formData.itemType) {
      case 'department':
        let jsonDepartment = {
          "degree_type":`${formData.degree_type}`,
          "description":`${formData.description}`,
          "name":`${formData.name}`,
          "personal_id":parseInt(`${formData.personal_id}`, 10)
        }
        
        console.log("department = " + JSON.stringify(jsonDepartment, null, 2));
        let response = await axios.put(`${environment.apiUrl}/departments/add`,jsonDepartment, { headers });
      break;
      case 'group':
        let jsonGroup = {
          "department_id":parseInt(`${formData.department_id}`, 10),
          "type":`${formData.type}`,
          "promotion":parseInt(`${formData.promotion}`, 10)
        }
        console.log("group = "+JSON.stringify(jsonGroup, null, 2))
        let response1 = await axios.put(`${environment.apiUrl}/groups/add`,jsonGroup, { headers });

        break;
      case 'subgroup':
        let jsonSubGroup = {
          "group_id":parseInt(`${formData.group_id}`, 10),
          "name": `${formData.name}`
        }
        console.log("subgroup = "+JSON.stringify(jsonSubGroup, null, 2))
        let response2 = await axios.put(`${environment.apiUrl}/subgroups/add`,jsonSubGroup, { headers });
      break;
      }
    }

  closeAddCohorteModal() {
    this.addCohorteClicked = false;
  }
  openAddCohorteModal() {
    this.addCohorteClicked = true;
  }
  async deleteItem(item : any, itemType : any) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    switch (itemType) {
      case 'eleve':
        const confirmation = window.confirm("Êtes-vous sûr de vouloir effectuer cette action ? "+
                      "\n Cela supprimera definitivement "+ item[0] + " "+item[1]);
        if (confirmation) {
          let response = await axios.delete(`${environment.apiUrl}/students/delete/${item[6]}`, { headers });
        console.log(response)
        }
        break;
      case 'ressource':
        const confirmation2 = window.confirm("Êtes-vous sûr de vouloir effectuer cette action ? "+
                      "\n Cela supprimera definitivement "+ item[0] );
        if (confirmation2) {
          await axios.delete(`${environment.apiUrl}/teachings/delete/${item[6]}`, { headers });
        }
        break;
      case 'salle':
        const confirmation3 = window.confirm("Êtes-vous sûr de vouloir effectuer cette action ? "+
                      "\n Cela supprimera definitivement "+ item[0]);
        if (confirmation3) {
          await axios.delete(`${environment.apiUrl}/rooms/delete/${item[4]}`, { headers });
        }
      
        break;
      case 'professeur':
        const confirmation4 = window.confirm("Êtes-vous sûr de vouloir effectuer cette action ? "+
                      "\n Cela supprimera definitivement "+ item[1] + " "+item[2]);
        if (confirmation4) {
          await axios.delete(`${environment.apiUrl}/personals/delete/${item[4]}`, { headers });
        }
      
        break;
      default:
        console.log('Valeur de str non reconnue');
        break;
    }    
    
  }

  submitSearch(str: any) {
    this.listeRecherche = []
    switch (str) {
      case 'eleve':
        this.listeRecherche = this.listeEleves.filter(eleve =>
          eleve[0].toLowerCase().includes(this.valeurInput.toLowerCase()) ||
          eleve[1].toLowerCase().includes(this.valeurInput.toLowerCase())
        );
        break;
      case 'ressource':
        this.listeRecherche = this.listeRessources.filter(ressource =>
          ressource[0].toLowerCase().includes(this.valeurInput.toLowerCase()) 
        );
        break;
      case 'salle':
        this.listeRecherche = this.listeSalles.filter(salle =>
          salle[0].toLowerCase().includes(this.valeurInput.toLowerCase()) 
        );
        break;
      case 'professeur':
        this.listeRecherche = this.listeProfs.filter(prof =>
          prof[2].toLowerCase().includes(this.valeurInput.toLowerCase()) ||
          prof[1].toLowerCase().includes(this.valeurInput.toLowerCase())
        );
        break;
      default:
        console.log('Valeur recherchée non reconnue');
        break;
    }
  }

  async onChangeTPSelect(event : Event) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const selectedTP = event.target as HTMLSelectElement;
    const selectedValue = selectedTP.value;
    const valuesArray = selectedValue.split(',');

    this.listeEleves = [];
    this.isTPClicked = !this.isTPClicked;
    let jsonData = {
      "department_id": `${this.selectedDepartment[0]}`,
      "subgroup_id": `${valuesArray[0]}`,
      "group_id": `${this.selectedTD[0]}`
    }

    let response = await axios.post(`${environment.apiUrl}/students/subgroups`,jsonData, { headers });
    let data = response.data.map((eleve: any) => [eleve.first_name, eleve.last_name, eleve.mail,eleve.phone_number,eleve.group_id, eleve.subgroup_id, eleve.user_id,eleve.department_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[7]) {
          tab[7] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[4]) {
          tab[4] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[5]) {
          tab[5] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });
    
  }
  async onChangeTDSelect(event : Event) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const selectElement  = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const valuesArray = selectedValue.split(',');
    this.selectedTD = valuesArray
    this.listeEleves = [];
    this.isTDClicked = !this.isTDClicked;
    let jsonData = {
      "group_id": `${valuesArray[0]}`,
      "department_id": `${this.selectedDepartment[0]}`,
    }
    let response = await axios.post(`${environment.apiUrl}/students/groups`,jsonData, { headers });
    let data = response.data.map((eleve: any) => [eleve.first_name, eleve.last_name, eleve.mail,eleve.phone_number,eleve.group_id, eleve.subgroup_id, eleve.user_id,eleve.department_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[7]) {
          tab[7] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[4]) {
          tab[4] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[5]) {
          tab[5] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });

    this.listeSubGroup = []
    let response1 = await axios.post(`${environment.apiUrl}/subgroups/identify`,jsonData, { headers });
    let data1 = response1.data.map((subgroup: any) => [subgroup.id, subgroup.name, subgroup.group_id]);
    data1.forEach((tab: string[]) => {
      this.listeSubGroup.push(tab);
    });  
    console.log('subgroup = '+ this.listeSubGroup)
  }

  async departmentClick(department: any) {   
    this.isDepartmentClicked = !this.isDepartmentClicked;
    this.selectedDepartment[1] = department[1]
    this.selectedDepartment[0] = department[0]
    this.listeEleves = [];
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let response = await axios.get(`${environment.apiUrl}/students/department/${department[0]}`, { headers });
    let data = response.data.map((eleve: any) => [eleve.first_name, eleve.last_name, eleve.mail,eleve.phone_number,eleve.group_id, eleve.subgroup_id, eleve.user_id,eleve.department_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[7]) {
          tab[7] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[4]) {
          tab[4] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[5]) {
          tab[5] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });
  }
  async promotionClick(promo: any) {
    this.listeGroup = [];
    this.listeEleves = [];
    this.isPromotionClicked = !this.isPromotionClicked;

    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let jsonData = {
      "department_id": `${this.selectedDepartment[0]}`,
      "promotion": `${promo}`
    }
    let response = await axios.post(`${environment.apiUrl}/groups/identify`, jsonData , {headers} );
    let data = response.data.map((group: any) => [group.id, group.department_id, group.type, group.promotion]);
    data.forEach((tab: string[]) => {
      this.listeGroup.push(tab);
    });
    let response1 = await axios.post(`${environment.apiUrl}/students/promotion-and-department`, jsonData, {headers}) 
    let data1 = response1.data.map((eleve: any) => [eleve.first_name, eleve.last_name, eleve.mail,eleve.phone_number,eleve.group_id, eleve.subgroup_id, eleve.user_id,eleve.department_id]);
    data1.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[7]) {
          tab[7] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[4]) {
          tab[4] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[5]) {
          tab[5] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });
  }
  
  async initListeDepartment() {
    this.listeDepartment = [];
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/departments/get`, {headers});
    let data = response.data.map((department: any) => [department.id, department.name]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.push(tab);
    });
  }
  async initListeSubGroup() {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/subgroups/get`, {headers});
    let data = response.data.map((subgroup: any) => [subgroup.id, subgroup.name, subgroup.group_id]);
    data.forEach((tab: string[]) => {
      this.listeSubGroup.push(tab);
    });
  }
  async initListeGroup() {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/groups/get`, {headers});
    let data = response.data.map((group: any) => [group.id, group.type, group.department_id, group.promotion]);
    data.forEach((tab: string[]) => {
      this.listeGroup.push(tab);
    });
  }

  async initEleveMap() {
    this.limit = 5
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    this.listeEleves = [];
    let response = await axios.get(`${environment.apiUrl}/students/get`, {headers});
    let data = response.data.map((eleve: any) => [eleve.first_name, eleve.last_name, eleve.mail,eleve.phone_number,eleve.group_id, eleve.subgroup_id, eleve.user_id,eleve.department_id]);
    data.forEach((tab: string[]) => {
      this.listeDepartment.forEach((dept: string[]) => {
        if (dept[0] === tab[7]) {
          tab[7] = dept[1];
        }
      });
      this.listeGroup.forEach((group: string[]) => {
        if (group[0] === tab[4]) {
          tab[4] = group[1];
        }
      });
      this.listeSubGroup.forEach((subGroup: string[]) => {
        if (subGroup[0] === tab[5]) {
          tab[5] = subGroup[1];
        }
      });
      this.listeEleves.push(tab);
    });
    this.listeRecherche = this.listeEleves
    this.gestionActuelle = "eleves";
  }

  async initSalleMap () {
    this.limit = 5
    this.listeSalles = []
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/rooms/get`, {headers});
    let data = response.data.map((salle: any) => [salle.code,salle.capacity, salle.has_computer, salle.has_projector, salle.id]);
    data.forEach((tab: string[]) => {
      this.listeSalles.push(tab);
    });
    this.listeRecherche = this.listeSalles
    this.gestionActuelle = "salles";
  }

  async initProfesseurMap() {
    this.listeProfs = []
    this.limit = 5
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/personals/get`, {headers});
    let data = response.data.map((prof: any) => [ prof.mail,prof.first_name,prof.last_name, prof.personal_code,prof.id]);
    data.forEach((tab: string[]) => {
      this.listeProfs.push(tab);
    });
    this.listeRecherche = this.listeProfs
    this.gestionActuelle = "professeurs";
  }

  async initRessourceMap() {
    this.limit = 5
    this.listeRessources = []
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let response = await axios.get(`${environment.apiUrl}/teachings/get`, {headers});
    let data = response.data.map((ressource: any) => [ressource.title, ressource.teaching_type, ressource.semestre, ressource.hour_number,  ressource.color, ressource.sequence, ressource.id]);
    data.forEach((tab: string[]) => {
      this.listeRessources.push(tab);
    });
    this.listeRecherche = this.listeRessources
    this.gestionActuelle = "ressources";
  }

  

  afficherLesCohortes() {
    if ( this.showAllCohorte) {
      this.showAllCohorte = false
      this.showAllStudents = true;
    } else {
      this.showAllCohorte = true;
      this.showAllStudents = false;
    }
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
    this.updateEleveClicked = ! this.updateEleveClicked

    Object.keys(this.jsonEleve).forEach((key, index) => {
      this.jsonEleve[key] = eleve[index];
    }); 
    this.isUpdateEleveModalOpen = true;
  }
  closeUpdateEleveModal(reload?: boolean) {
      this.isUpdateEleveModalOpen = false;
  }

  async updateEleveSubmit(formData: any) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    // await axios.patch(`${environment.apiUrl}/students/update/${formData.user_id}`, formData, { headers })
    // .then(response => {
    //   console.log('Données mises à jour avec succès :', response.data);
    //   // Traitez la réponse en conséquence
    // })
    // .catch(error => {
    //   console.error('Erreur lors de la mise à jour des données :', error);
    //   // Gérez les erreurs en conséquence
    // });
  }
    
  openUpdateProfModal(prof : any) {
    Object.keys(this.jsonProf).forEach((key, index) => {
      this.jsonProf[key] = prof[index];
    }); 
    this.isUpdateProfModalOpen = true;
  }

  closeUpdateProfModal(reload?: boolean) {
      this.isUpdateProfModalOpen = false;
  }

  async updateProfSubmit(formData: any) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.patch(`${environment.apiUrl}/personals/update/${formData.id}`, formData, { headers })

  }

  openUpdateSalleModal(prof : any) {
    Object.keys(this.jsonSalle).forEach((key, index) => {
      this.jsonSalle[key] = prof[index];
    }); 
    this.isUpdateSalleModalOpen = true;
  }
  closeUpdateSalleModal(reload?: boolean) {
      this.isUpdateSalleModalOpen = false;
  }

  async updateSalleSubmit(formData: any) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

  }

  openUpdateRessourceModal(ressource : any) {
    Object.keys(this.jsonRessource).forEach((key, index) => {
      this.jsonRessource[key] = ressource[index];
    }); 
    this.isUpdateRessourceModalOpen = true;
  }
  closeUpdateRessourceModal(reload?: boolean) {
      this.isUpdateRessourceModalOpen = false;
  }

  async updateRessourceSubmit(formData: any) {
    this.authService.checkAuthentication();
    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  }
}
