import { Component, DestroyRef, OnInit, inject, signal, input, output, Input } from '@angular/core';
import { Service } from './service';

import { Pattern, User } from './pattern.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() currentUser?: User;
  openViewModal = false;
  openMeatballsMenu = false;
  selectedPattern?: Pattern;

  onClick(e: Event) {
   this.openMeatballsMenu = true;
  }
  // https://api.ravelry.com/patterns.json?ids=601
  showPattern(e: Event) {
    this.selectedPattern 
    this.openViewModal = true;
  }

  editPattern(e: Event) {

  }

  deletePattern(e: Event) {

  }

  private service = inject(Service);

  private destroyRef = inject(DestroyRef);
     
  get patterns() {
     return this.service.patterns;
  }

  isFetching = signal(false);
  error = signal('');
  ngOnInit() {
    this.isFetching.set(true);
    const subscription1 = this.service.loadPatterns().subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription1.unsubscribe();
    });
  }
}
