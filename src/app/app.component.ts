import { Component, DestroyRef, inject, signal } from '@angular/core';

import { ErrorService } from './shared/error.service';
import { Service } from './patterns/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  private errorService = inject(ErrorService);
  clientId = "123"; // Set env variable
  clientSecret = "abc"; // Set env variable
  redirectUrl = "localhost"; // Set env variable

  authLink = "https://www.ravelry.com/oauth2/auth?client_id="+this.clientId+"&client_secret="+this.clientSecret+"&redirect_uri="+this.redirectUrl+"&state=whydoineedthis&response_type=code&scope=offline";

  get accessToken() {
    return this.service.accessToken;
  }

  get authCode() {
    return this.service.route.snapshot.queryParams["code"];
  }
  get currentUser() {
    return this.service.currentUser;
  }
  private destroyRef = inject(DestroyRef);
  
  private service = inject(Service);
  saveToken() {
    if (this.authCode !== "" && this.authCode !== undefined) {
      if (!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "") {
        localStorage.setItem("access_token", this.authCode);
        location.reload();
      }
    }
  }
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.service.loadAccessToken().subscribe({
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
