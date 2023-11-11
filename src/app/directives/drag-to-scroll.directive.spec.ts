import { DragToScrollDirective } from './drag-to-scroll.directive';
import { ElementRef } from '@angular/core';

describe('DragToScrollDirective', () => {
    it('should create an instance', () => {
        const elementRef = new ElementRef(document.createElement('div'));
        const directive = new DragToScrollDirective(elementRef);
        expect(directive).toBeTruthy();
    });
});
