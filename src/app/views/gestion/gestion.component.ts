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
  listeEleves: any[] = [];
  recherche: any = '';
  mapIdNomRessources = new Map<string, string>();
  limit: number = 4;
  isAddEleveModalOpen: boolean = false;
  showAllCohorte: boolean = false;
  
  constructor( private dateFormattingService: DateFormattingService) {
    this.formattedDate = this.dateFormattingService.format(new Date());
  
  }

  updateEleveModal(eleve: any){
    console.log(eleve + "Eleve")
    //TODOOOOOO
  }
  async initEleveMap() {

    let response = await axios.get(`${environment.apiUrl}/students/get`, {});
    let data = response.data.map((eleve: any) => [eleve.student_number, eleve.department_id, eleve.last_name, eleve.first_name, eleve.mail, eleve.phone_number]);
    data.forEach((tab: string[]) => {
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
    this.showAllStudents = !this.showAllStudents;
  }

  afficherLesCohortes() {
    //TODO
    this.showAllCohorte = !this.showAllCohorte;
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
  
  updateAddEleveModal(){
      this.isAddEleveModalOpen = true;
  }

   closeAddEleveModal(reload?: boolean) {
        this.isAddEleveModalOpen = false;
    }
}
