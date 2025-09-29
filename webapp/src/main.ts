import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';        // correct, stays the same            // 👈 points to app.ts
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { tokenHttp } from './app/core/token-http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenHttp]))
  ]
});
