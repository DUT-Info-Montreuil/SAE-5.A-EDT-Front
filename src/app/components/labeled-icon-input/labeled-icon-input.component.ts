import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginForm } from 'src/app/models/forms/AuthLoginForm';

@Component({
    selector: 'app-labeled-icon-input',
    templateUrl: './labeled-icon-input.component.html',
    styleUrls: ['./labeled-icon-input.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])])],
})
export class LabeledIconInputComponent {
    @Input() label!: string;
    @Input() placeholder: string = '';
    @Input() typeInput: string = 'text';
    @Input() hasIcon: boolean = true;
    @Input() hasAction: boolean = false;
}
