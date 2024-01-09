import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Course } from '../models/entities';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    constructor(private authService: AuthService) {}

    async addCourse(course: Course) {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.put(`${environment.apiUrl}/courses/add`, course, { headers });
    }

    async deleteCourse(courseId: string) {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.delete(`${environment.apiUrl}/courses/delete/${courseId}`, { headers });
    }

    async updateCourse(course: Course) {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.patch(`${environment.apiUrl}/courses/update/${course?.id}`, course, { headers });
    }

    async getTeachings() {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.get(`${environment.apiUrl}/teachings/get`, { headers });
    }

    async getSubGroups() {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.get(`${environment.apiUrl}/subgroups/get`, { headers });
    }

    createCourseEntity(courseData: FormGroup, courseFilterData: FormGroup): Course {
        const { description, date, starttime, endtime, course_type } = courseData.value;
        const { teaching_id, personals, rooms, subGroups } = courseFilterData.value;

        return new Course({
            description,
            starttime: this.formatDateTime(date, starttime),
            endtime: this.formatDateTime(date, endtime),
            course_type,
            teaching_id: teaching_id.toString(),
            personals,
            rooms,
            subGroups,
        });
    }

    private formatDateTime(date: string, time: string): string {
        return `${date} ${time}:00.000000`;
    }
}
