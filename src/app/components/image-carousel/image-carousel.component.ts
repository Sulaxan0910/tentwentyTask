import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {}
  rotateVal = 0;
  intervalId: any;
  dragStartXAxis = 0;
  dragstart(event: any) {
    this.dragStartXAxis = event.clientX;
  }
  dragend(event: any) {
    if (event.clientX - this.dragStartXAxis < 0) this.rotateimageBasedonDrag(0);
    else this.rotateimageBasedonDrag(1);
  }
  rotateimageBasedonDrag(direction: number) {
    if (direction) {
      this.rotateVal += 45;
    } else {
      this.rotateVal -= 45;
    }
  }
  circleX: number = 125;
  circleY: number = 150;

  onMouseMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const { left, top } = target.getBoundingClientRect();

    this.circleX = event.clientX - left;
    this.circleY = event.clientY - top;
  }
}
