import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

import { AppComponent } from './app.component';
import { UserComponent } from './patterns/user.component';
import { UserIntroComponent } from './patterns/user-intro/user-intro.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // });
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('[Incoming Response]');
          console.log(event.status);
          console.log(event.body);
        }
      },
    })
  );
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserIntroComponent,
    ModalComponent,
    ErrorModalComponent
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot([])],
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
