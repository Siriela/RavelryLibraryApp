import { Component, DestroyRef, inject, signal } from '@angular/core';

import { User } from '../pattern.model';
import { Service } from '../service';

@Component({
  selector: 'app-user-intro',
  templateUrl: './user-intro.component.html',
  styleUrl: './user-intro.component.css',
})
export class UserIntroComponent {
  isFetching = signal(false);
  error = signal('');
  private service = inject(Service);
  private destroyRef = inject(DestroyRef);
  currentUser = signal<User | undefined>(undefined);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.service.loadCurrentUser().subscribe({
      next: (user) => {
        this.currentUser.set(user);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
