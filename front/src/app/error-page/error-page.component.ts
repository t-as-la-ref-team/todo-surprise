import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center" style="min-height:100vh;">
      <img [src]="imageSrc" [alt]="title" style="max-width:100%;height:auto;">
      <h2 class="text-light mt-4">{{ title }}</h2>
      <p class="text-light" *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    :host {
      width: 100vw;
      height: 100vh;
      background: #222;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class ErrorPageComponent implements OnInit {
  @Input() imageSrc = '';
  @Input() title = '';
  @Input() message?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data) {
      this.imageSrc = data['imageSrc'] || this.imageSrc;
      this.title = data['title'] || this.title;
      this.message = data['message'] || this.message;
    }
  }
}