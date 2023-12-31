import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Course } from '../models/entities';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    constructor() {}

    async addCourse(course: Course) {
        return await axios.post(`${environment.apiUrl}/courses/add`, course);
    }
    async getTeachings() {
        return await axios.get(`${environment.apiUrl}/teachings/get`);
    }
}
