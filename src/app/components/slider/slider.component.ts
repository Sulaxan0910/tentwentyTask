import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit {
  @ViewChild('transition') transition!: ElementRef;
  currentSliderImage: any;
  nextSliderImage: any;
  currentSliderIndex: number = 0;
  sliderImages = [
    {
      image: '/assets/images/hero-image.webp',
      title: 'Slider 1 Image',
      description: 'Slider 1 Image Description',
    },
    {
      image: '/assets/images/hero-image-1.webp',
      title: 'Slider 2 Image',
      description: 'Slider 2 Image Description',
    },
  ];
  words: string[] = ['Welcome', 'To', 'TenTwenty', 'Farms'];
  words2: string[] = ['From', 'Our', 'Farms'];
  words3: string[] = ['To', 'your', 'Hands'];
  interval: any;
  subscription!: Subscription;
  animate = false;
  delay1 = 4 * 0.3;
  delay2 = 7 * 0.3;

  ngOnInit(): void {
    this.currentSliderImage = this.sliderImages[0];
    this.nextSliderImage = this.sliderImages[1];
  }
  startSlider() {
    this.subscription = interval(5000).subscribe(() => {
      this.changeImage();
    });
  }
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }
  changeImage() {
    this.animate = true;
    this.currentSliderIndex = (this.currentSliderIndex + 1) % 2;
    this.currentSliderImage = this.sliderImages[this.currentSliderIndex];
    this.nextSliderImage = this.sliderImages[(this.currentSliderIndex + 1) % 2];
    this.resetAnimation();
  }

  resetAnimation() {
    // Remove the animation class
    this.renderer.removeClass(this.transition.nativeElement, 'load-transition');
    // Force reflow to restart the animation
    void this.transition.nativeElement.offsetWidth;

    // Re-add the animation class
    this.renderer.addClass(this.transition.nativeElement, 'load-transition');
  }
}
