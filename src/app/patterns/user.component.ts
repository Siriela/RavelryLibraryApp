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
  private service = inject(Service);

  private destroyRef = inject(DestroyRef);
     get patterns() {
     return this.service.patterns;
  }

  isFetching = signal(false);
  error = signal('');
  ngOnInit() {
    this.isFetching.set(true);
    const subscription2 = this.service.loadPatterns().subscribe({
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription2.unsubscribe();
    });
  }
}
