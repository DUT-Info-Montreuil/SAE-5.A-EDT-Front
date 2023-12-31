import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input() label?: string;
    @Input() loading = false;
    @Input() disabled = false;
    @Input() outline = false;
    @Input() outlineColor?: string;
    @Input() type = 'primary';
    @Input() fontSize = 'text-base';
    @Input() paddingX = 'px-4';
    @Input() paddingY = 'py-2';
    @Input() hasText = true;
    @Input() shadow = true;

    get customClass(): string[] {
        let computedClass: string[] = [this.fontSize, this.paddingX, this.paddingY];

        if (this.type === 'inverse') {
            computedClass.push('btn-primary-inverse');
        } else if (this.type === 'grey') {
            computedClass.push('btn-grey');
        } else {
            computedClass.push('btn-primary');
        }

        return computedClass;
    }
}
