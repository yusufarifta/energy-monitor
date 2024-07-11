import {ApplicationConfig, importProvidersFrom, Injector} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {ModalModule} from "ngx-bootstrap/modal"
import {appInjector} from "./app.injector";
import {NgxPaginationModule} from "ngx-pagination";
import {ExtendedHttpInterceptor} from "./services/system/extended-http.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    provideHttpClient(withInterceptorsFromDi()), {provide: HTTP_INTERCEPTORS, useClass: ExtendedHttpInterceptor, multi: true},
    importProvidersFrom(SidebarModule, DropdownModule, ModalModule.forRoot(), NgxPaginationModule, NgbModule),
    IconSetService,
    provideAnimations(),
    provideHttpClient(),
    provideToastr(),
  ]
};
