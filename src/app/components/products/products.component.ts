import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  dragSliderImageIndex = 1;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimation();
    }
  }
  setupScrollAnimation() {
    const texts = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(texts).indexOf(entry.target as Element);
          const delay = index * 400;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    texts.forEach((text) => {
      observer.observe(text);
    });
  }

  slides = [
    {
      image:
        'https://s3-alpha-sig.figma.com/img/0791/0f7f/188a8f483ded59346fe0fd6d10d14b9a?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ez1ON2kC5wEgBERR9x1P2Dhra4fGzPMvB7Yds47CaJQXBHMylmDFQe9HLh5sB0qODfCpJl4MtfYvT72G4~6M5K4JHI0sExXuBk-4AItQvy1vigto-ZdZjvxKiGYiGjXzFrNji1c7bMEWaIAPjyUUGqW6bsrTfTM0klqxFoh2uxLWi5Kh4p-jrxTtZ7LsjajObA2opHko0xre1WkKHWvqK~CecuU0MqF7b4xqv0o~nLbprfc9cTjnxXaRWUA0xV0FJOzIOy28~65LIhywD6Pc06SOmVeRjs3IEVDCWV~T4ZVseTuimSksd7U4JBQW9DS~POfU7sRmmw9OJeSRrdgA5A__',
      title: 'Client 2',
      description: 'Delhi, India',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/8f78/f545/2c06cf20973a3a45f5be4b527cd28d57?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f~~GR3ASGpQstI-~tM3YzqM5AInZ~I3pSpm3BkkqgwSDcE7BvPb7x8-cqJGcfQocKzm7xtu9Rq-fwqIHj0PH~cM~vRMFcUJQDMn9qn8tYxAe0aHQJIQokDoTTJmB8WpKiSKHyjVnER6vp7OMvqTK-EES8Eb7~BgM0T8j7QoVS9WCyjeF5nqN4rL3OHRQj9y1KhxBcgzFd48l4uk9J8mbYjMtnP4f4MPQXOnv4~p77VpRZc0Dac7ybDVXViLueh7oAMAWe9tVAbHxcCSRN1KIDsyaJP5LBX5s2pRV5zRJUxh4SFXlkeaU0j7~8upnG71jQYe27SeMA42a6JQDHysX0A__',
      title: 'Client 1',
      description: 'Dubai, United Arab Emirates',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/340f/ac90/fd6dfbaeba51d1e63c2f7abcbe67478b?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VanUTpBqQiIMalw8MftpBa2PLI02KCHM2dRNRx6POhIbpJUEiawpmb0kzg1zsiGajz8PkSdpkhuoQ6TiDJPfD4~iX4ansBM8z4aG5s9Vu5RubuPs1OigBcxsTywtlUC3MHoOtLqQSowVdWeCZ5bd1J3Nd3iP~Otf7XyKYe7T8cGGdakL1GtG0c7vmkEEZsE1wwCqRX4sLwUMqpwzcfnVtqwJQByFbc7cdp9BhYc6wBBANf9VYZb8kvld1Ln9UgsZ7mfxlLgxidngU8bDlLAIcGxdPumMkw03NY-gv7-pQQidrDmSBBC-7oaM4Bl8kk~tfOqzylibWJvpT92d7tRnkg__',
      title: 'Client 3',
      description: 'Abu Dhabi, United Arab Emirates',
    },
  ];
  currentSlide = 0;
  slideInterval: any;
  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Auto-slide every 5 seconds
  }

  stopAutoSlide() {
    clearInterval(this.slideInterval);
  }

  goToSlide(index: number) {
    this.stopAutoSlide();
    this.currentSlide = index;
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
  currentImage = this.slides[this.dragSliderImageIndex];

  leftImage = this.slides[Math.abs((this.dragSliderImageIndex - 1) % 3)];
  rightImage = this.slides[(this.dragSliderImageIndex + 1) % 3];

  initialX: number | null = null;
  initialY: number | null = null;
  transform: string = '';
  offsetX: number = 0;
  offsetY: number = 0;

  onMouseDown(event: MouseEvent): void {
    this.startDragging(event.clientX, event.clientY, event);
  }

  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0]; // Get the first touch point
    this.startDragging(touch.clientX, touch.clientY, event);
  }

  startDragging(
    clientX: number,
    clientY: number,
    event: MouseEvent | TouchEvent
  ): void {
    // Prevent default behavior (like text selection)
    event.preventDefault();

    // Capture initial position
    this.initialX = clientX;
    this.initialY = clientY;

    // Calculate the offset
    const target = event.target as HTMLElement;
    this.offsetX = clientX - target.getBoundingClientRect().left;
    this.offsetY = clientY - target.getBoundingClientRect().top;

    const mouseMoveHandler = (e: MouseEvent | TouchEvent) => this.onMove(e);
    const mouseUpHandler = (e: MouseEvent | TouchEvent) =>
      this.onEnd(e, mouseMoveHandler);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('touchmove', mouseMoveHandler, {
      passive: false,
    });
    document.addEventListener(
      'touchend',
      (e) => this.onEnd(e, mouseMoveHandler),
      { passive: false }
    );
  }
  onMove(event: MouseEvent | TouchEvent): void {
    let clientX: number;
    let clientY: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent) {
      const touch = event.touches[0]; // Get the first touch point
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      return; // If it's neither, exit
    }

    if (this.initialX !== null && this.initialY !== null) {
      // Calculate new position based on the mouse/touch movement
      const deltaX = clientX - this.initialX;
      const deltaY = clientY - this.initialY;

      // Update the transform property to move the element
      this.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  }
  onEnd(
    event: MouseEvent | TouchEvent,
    mouseMoveHandler: (e: MouseEvent | TouchEvent) => void
  ): void {
    let clientX: number;
    let clientY: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
      this.computeDragging(clientX, clientY, mouseMoveHandler);
    } else if (event instanceof TouchEvent) {
      const touch = event.changedTouches[0]; // Get the first touch point
      clientX = touch.clientX;
      clientY = touch.clientY;
      this.computeDragging(clientX, clientY, mouseMoveHandler);
    }
    // Clean up
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', (e) =>
      this.onEnd(e, mouseMoveHandler)
    );
    document.removeEventListener('touchmove', mouseMoveHandler);
    document.removeEventListener('touchend', (e) =>
      this.onEnd(e, mouseMoveHandler)
    );

    // Reset the initial positions
    this.initialX = null;
    this.initialY = null;
    this.resetPosition();
  }
  computeDragging(
    clientX: number,
    clientY: any,
    mouseMoveHandler: (e: MouseEvent | TouchEvent) => void
  ) {
    if (clientX && this.initialX) {
      if (clientX < this.initialX) {
        this.leftImage = this.slides[Math.abs(this.dragSliderImageIndex) % 3];
        this.rightImage =
          this.slides[Math.abs(this.dragSliderImageIndex - 1) % 3];
        this.dragSliderImageIndex = this.dragSliderImageIndex + 1;
        this.currentImage =
          this.slides[Math.abs(this.dragSliderImageIndex) % 3];

        this.initialX = this.initialX;
      } else if (clientX > this.initialX) {
        this.rightImage = this.slides[Math.abs(this.dragSliderImageIndex) % 3];
        this.leftImage =
          this.slides[Math.abs(this.dragSliderImageIndex + 1) % 3];

        this.dragSliderImageIndex = this.dragSliderImageIndex - 1;
        this.currentImage =
          this.slides[Math.abs(this.dragSliderImageIndex) % 3];
        this.initialX = this.initialX;
      } else {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', (e) =>
          this.onEnd(e, mouseMoveHandler)
        );
        document.removeEventListener('touchmove', mouseMoveHandler);
        document.removeEventListener('touchend', (e) =>
          this.onEnd(e, mouseMoveHandler)
        );
      }
    }
  }

  resetPosition(): void {
    this.transform = 'translate(0px, 0px)'; // Reset to original position
  }
}
