import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Course } from '../models/entities';
import { FormGroup } from '@angular/forms';

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

    createCourseEntity(courseData: FormGroup, courseFilterData: FormGroup): Course {
        const { description, date, starttime, endtime, course_type } = courseData.value;
        const { teaching_id, personal_id, rooms_id } = courseFilterData.value;

        return new Course({
            description,
            starttime: this.formatDateTime(date, starttime),
            endtime: this.formatDateTime(date, endtime),
            course_type,
            teaching_id: teaching_id.toString(),
            personal_id: personal_id.toString(),
            rooms_id: rooms_id.toString(),
        });
    }

    private formatDateTime(date: string, time: string): string {
        return `${date} ${time}:00.000000`;
    }
}
