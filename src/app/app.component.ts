import { Component, inject } from '@angular/core';

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

  findTokenParam (fragment: string) {
    return fragment.slice(fragment.indexOf('access_token=') + 13, fragment.indexOf('&'));
  } 
  error = this.errorService.error;
    private service = inject(Service);
    saveToken() {
      if (this.accessToken !== "") {
        if (!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "") {
          localStorage.setItem("access_token", this.accessToken);
          location.reload();
        }
      }
    }
    get accessToken() {
      return this.findTokenParam(this.service.route.snapshot.fragment || "");
    }
}
