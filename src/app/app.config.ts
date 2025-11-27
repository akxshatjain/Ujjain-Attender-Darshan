import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
ToastrModule.forRoot({
  timeOut: 3000,
  extendedTimeOut: 3000,
  disableTimeOut: "extendedTimeOut",  // 🚀 prevents mouse-hover reset
  tapToDismiss: false,                // 🚫 click won't dismiss unless close button
  progressBar: true,
  progressAnimation: 'decreasing',
  positionClass: 'toast-top-right',
  closeButton: true,
  preventDuplicates: true,
})

    )
  ]
};
