import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  images = [
    {
      url: '/assets/images/hero-image.webp',
      alt: '',
      title: 'Client 1',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image-1.webp',
      alt: '',
      title: 'Client 2',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image.webp',
      alt: '',
      title: 'Client 3',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image-1.webp',
      alt: '',
      title: 'Client 4',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image.webp',
      alt: '',
      title: 'Client 5',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image-1.webp',
      alt: '',
      title: 'Client 6',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image.webp',
      alt: '',
      title: 'Client 7',
      description: 'Abu Dhabi, United Arab Emirates',
    },
    {
      url: '/assets/images/hero-image-1.webp',
      alt: '',
      title: 'Client 8',
      description: 'Abu Dhabi, United Arab Emirates',
    },
  ];
  rotateVal = 0;
  intervalId: any;
  dragStartXAxis = 0;
  circleX: number = 125;
  circleY: number = 150;
  currentImage: any;
  currentImageIndex = 0;

  constructor() {
    this.currentImage = this.images[this.currentImageIndex];
  }

  dragstart(event: any, image: any, deviceType = 'desktop') {
    if (deviceType != 'desktop') {
      this.dragStartXAxis = event.changedTouches[0].clientX;
    } else {
      this.dragStartXAxis = event.clientX;
    }
  }
  dragend(event: any, image: any, deviceType = 'desktop') {
    let startPointEndPontDiff;
    if (deviceType != 'desktop') {
      startPointEndPontDiff =
        event.changedTouches[0].clientX - this.dragStartXAxis;
    } else {
      startPointEndPontDiff = event.clientX - this.dragStartXAxis;
    }
    if (startPointEndPontDiff < 0) {
      this.currentImage = this.images[++this.currentImageIndex % 8];
      this.rotateimageBasedonDrag(0, startPointEndPontDiff);
    } else {
      if (this.currentImageIndex < 1) {
        this.currentImageIndex = 7;
        this.currentImage = this.images[this.currentImageIndex];
      } else this.currentImage = this.images[--this.currentImageIndex];
      this.rotateimageBasedonDrag(1, startPointEndPontDiff);
    }
  }
  rotateimageBasedonDrag(direction: number, difference: number) {
    if (direction) {
      this.rotateVal += 45;
    } else {
      this.rotateVal -= 45;
    }
  }

  onMouseMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const { left, top } = target.getBoundingClientRect();

    this.circleX = event.clientX - left;
    this.circleY = event.clientY - top;
  }
}
