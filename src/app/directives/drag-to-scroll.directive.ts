import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appDragToScroll]',
})
export class DragToScrollDirective {
    private isDown = false;
    private startX!: number;
    private scrollLeft!: number;

    constructor(private el: ElementRef) {}

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        event.preventDefault();
        this.isDown = true;
        this.startX = event.pageX - this.el.nativeElement.offsetLeft;
        this.scrollLeft = this.el.nativeElement.scrollLeft;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.isDown = false;
    }

    @HostListener('mouseup')
    onMouseUp() {
        this.isDown = false;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if (!this.isDown) return;
        event.preventDefault();
        const x = event.pageX - this.el.nativeElement.offsetLeft;
        const walk = (x - this.startX) * 2;
        this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
    }
}
