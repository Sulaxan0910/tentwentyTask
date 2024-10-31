import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
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
}
